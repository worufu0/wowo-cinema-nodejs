const fetch = require('node-fetch');
const paypal = require('paypal-rest-sdk');
const TokenGenerator = require('uuid-token-generator');
const shortid = require('shortid');
const tokgen = new TokenGenerator();
const { totp } = require('otplib');
const Cryptr = require('cryptr');
totp.options = { step: 1800 };
const cryptr = new Cryptr(process.env.CRYPT_KEY || 'wolf');
const {
    ShowTime,
    Movie,
    Cinema,
    Room,
    RoomType,
    Booking,
    Ticket,
    User,
} = require('../models');
const appConfig = require('../configs/app');

class CheckoutController {
    // [GET] /checkout
    async index(req, res) {
        delete req.session.bookingVerify;
        delete req.session.bookingInfo;
        const user = JSON.parse(
            JSON.stringify(await User.findOne({ where: { id: req.user.id } }))
        );
        const showTime = JSON.parse(
            JSON.stringify(
                await ShowTime.findOne({
                    include: [
                        Movie,
                        {
                            model: Booking,
                            include: Ticket,
                        },
                        {
                            model: Room,
                            include: [Cinema, RoomType],
                        },
                    ],
                    where: { id: req.query.showtime },
                })
            )
        );

        let bookingSeats, back;
        let calInfo = { count: 0, total: 0, discount: 0, vat: 5, pay: 0 };
        if (showTime) {
            back = req.query.back
                ? cryptr.decrypt(req.query.back)
                : `/booking?showtime=${showTime.id}`;

            req.query.seat
                ? (bookingSeats = req.query.seat.split(' '))
                : res.redirect(back);

            showTime.Bookings.forEach((booking) => {
                booking.Tickets.forEach((ticket) => {
                    if (bookingSeats.includes(ticket.seatName)) {
                        res.redirect(back);
                    }
                });
            });

            calInfo.count = bookingSeats.length;
            calInfo.discount = 2 * (calInfo.count - 1);
            calInfo.total = calInfo.count * showTime.price;
            calInfo.pay =
                calInfo.total +
                (calInfo.total * (calInfo.vat - calInfo.discount)) / 100;

            req.session.bookingInfo = {
                showTime: showTime,
                calInfo: calInfo,
                bookingSeats: bookingSeats,
            };
        }

        res.render('pages/checkout', {
            title: `${appConfig.pageTitle.checkout} | ${appConfig.appName}`,
            info: {
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
            },
            showTime: showTime,
            calInfo: calInfo,
            back: back,
        });
    }

    // [POST] /checkout
    async checkout(req, res) {
        paypal.configure({
            mode: process.env.PAYPAL_MODE || 'sandbox',
            client_id:
                process.env.PAYPAL_CLIENT_ID ||
                'AZFSw1f52bVTFLvjn_0suweAgP3dWYc_hGhJEQG5kb49n-BahPcKSWiydex1TVeKByZdOj6V6PwtJCgg',
            client_secret:
                process.env.PAYPAL_CLIENT_SECRET ||
                'EP98gHyxKPlSno-Q3XIcfh4hG1w_Derd6RSY_1EAZcK0mes1YflOYQMxZxThJMyNnnq4AWrdz7o71b78',
        });

        const url =
            'http://data.fixer.io/api/latest?access_key=12a8c40d9e7b4263b3b16399de40129b&format=1';
        const response = await fetch(url);
        const data = await response.json();
        req.session.payment = {
            id: shortid.generate(),
            pay: Math.round(
                ((req.session.bookingInfo.calInfo.pay * 1000) /
                    data.rates.VND) *
                    data.rates.USD
            ),
        };

        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            redirect_urls: {
                return_url: `${
                    process.env.URL_ROOT || 'http://localhost:3000'
                }/checkout/success`,
                cancel_url: `${
                    process.env.URL_ROOT || 'http://localhost:3000'
                }/checkout/cancel`,
            },
            transactions: [
                {
                    item_list: {
                        items: [
                            {
                                sku: req.session.payment.id,
                                price: req.session.payment.pay,
                                currency: 'USD',
                                quantity: 1,
                            },
                        ],
                    },
                    amount: {
                        currency: 'USD',
                        total: req.session.payment.pay,
                    },
                },
            ],
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                const approvalUrl = payment.links.find(
                    (link) => link.rel === 'approval_url'
                );
                res.redirect(approvalUrl.href);
            }
        });
    }

    // [GET] /checkout/allow-payment
    allowPayment(req, res) {
        req.session.bookingVerify ? res.json(true) : res.json(false);
    }

    // [POST] /checkout/success
    async success(req, res) {
        const execute_payment_json = {
            payer_id: req.query.PayerID,
            transactions: [
                {
                    amount: {
                        currency: 'USD',
                        total: req.session.payment.pay,
                    },
                },
            ],
        };

        const paymentId = req.query.paymentId;

        paypal.payment.execute(
            paymentId,
            execute_payment_json,
            function (error, payment) {
                if (error) {
                    throw error;
                }
            }
        );

        const movie = await Movie.findOne({
            where: { id: req.session.bookingInfo.showTime.Movie.id },
        });
        await movie.increment('sold', {
            by: req.session.bookingInfo.bookingSeats.length,
        });

        await Booking.create({
            id: req.session.payment.id,
            userId: req.user.id,
            showTimeId: req.session.bookingInfo.showTime.id,
            bookingTime: new Date(),
            pay: req.session.bookingInfo.calInfo.pay,
        });

        req.session.bookingInfo.bookingSeats.forEach(async (seatName) => {
            const [y, ...x] = seatName;

            await Ticket.create({
                id: shortid.generate(),
                bookingId: req.session.payment.id,
                seatName: seatName,
                x: x.join(''),
                y: y,
                price: req.session.bookingInfo.showTime.price,
            });
        });

        delete req.session.payment;

        res.render('pages/notification', {
            layout: 'other',
            title: `${appConfig.pageTitle.checkout} | ${appConfig.appName}`,
            appName: appConfig.appName,
            notification: `Thanh toán thành công. Cảm ơn bạn đã mua vé tại Wowo Cinema`,
        });
    }

    // [POST] /checkout/cancel
    cancel(req, res) {
        delete req.session.payment;
        res.send('Hủy bỏ giao dịch');
    }

    // [POST] /checkout/send
    send(req, res) {
        if (req.body.send === 'true') {
            const otp = totp.generate(req.user.token);
            const accountSid =
                process.env.TWILIO_ACCOUNT_SID ||
                'AC6920bef8341db8902f13c6a585df0676';
            const authToken =
                process.env.TWILIO_AUTH_TOKEN ||
                'acdeff76be424084d74efdc175b55b44';
            const client = require('twilio')(accountSid, authToken);
            const phone = req.body.phone.replace(0, '+84');
            const bookingInfo = req.session.bookingInfo;

            client.messages
                .create({
                    from: process.env.TWILIO_PHONE_NUMBER || '+15005550006',
                    to: phone,
                    body: `Xác nhận thông tin đặt vé xem phim tại Wowo Cinema.\nTên phim: ${
                        bookingInfo.showTime.Movie.name
                    }\nThời gian: ${require('moment')(bookingInfo.showTime.time)
                        .locale('vi')
                        .format('llll')}\nRạp: ${
                        bookingInfo.showTime.Room.name
                    } - ${bookingInfo.showTime.Room.Cinema.name}\nLoại rạp: ${
                        bookingInfo.showTime.Room.RoomType.name
                    }\nGiá vé: ${(
                        bookingInfo.showTime.price * 1000
                    ).toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND',
                    })}\nSố lượng vé: ${
                        bookingInfo.calInfo.count
                    }\nTổng giá vé: ${(
                        bookingInfo.calInfo.total * 1000
                    ).toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND',
                    })}\nMã vé: ${req.session.bookingInfo.bookingSeats
                        .join(', ')
                        .toUpperCase()}\nGiảm giá: ${
                        bookingInfo.calInfo.discount
                    }%\nThuế VAT: 10%\nTổng thanh toán: ${(
                        bookingInfo.calInfo.pay * 1000
                    ).toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND',
                    })}\nMã xác nhận đặt vé của bạn là ${otp}`,
                })
                .then((message) => {
                    console.log(message);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        res.json(true);
    }

    // [POST] /checkout/verify
    async verify(req, res) {
        const isValid = totp.verify({
            token: req.body.otp,
            secret: req.user.token,
        });

        if (isValid) {
            req.session.bookingVerify = true;
            const token = new TokenGenerator(
                256,
                TokenGenerator.BASE62
            ).generate();

            await User.update(
                { token: token, phone: req.body.phone },
                { where: req.user }
            );
        }

        res.json(isValid);
    }
}

module.exports = new CheckoutController();
