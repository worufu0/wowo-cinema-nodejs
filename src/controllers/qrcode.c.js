const qrcode = require('qrcode');
const { Booking, ShowTime, Ticket, Room, Movie, Cinema } = require('../models');
const appConfig = require('../configs/app');

class QRCode {
    async index(req, res) {
        const booking = await Booking.findOne({
            include: [
                Ticket,
                {
                    model: ShowTime,
                    include: [
                        Movie,
                        {
                            model: Room,
                            include: Cinema,
                        },
                    ],
                },
            ],
            where: { id: req.params.id },
        });

        if (booking) {
            const bookingSeats = booking.Tickets.map((ticket) =>
                ticket.seatName.toUpperCase()
            );

            res.render('pages/notification', {
                layout: 'other',
                title: `${appConfig.pageTitle.changePassword} | ${appConfig.appName}`,
                appName: appConfig.appName,
                notification: `
                <h6>Xác nhận thành công !</h6></br>
                Mã đặt: <b>${booking.id}</b></br>
                Phim: <b>${booking.ShowTime.Movie.name}</b></br>
                Thời gian: <b>${require('moment')(booking.ShowTime.time)
                    .locale('vi')
                    .format('llll')}</b></br>
                Rạp: <b>${booking.ShowTime.Room.name} - ${
                    booking.ShowTime.Room.Cinema.name
                }</b></br>
                Mã ghế: <b>${bookingSeats.join(', ')}</b>`,
            });
        } else {
            res.render('pages/notification', {
                layout: 'other',
                title: `${appConfig.pageTitle.changePassword} | ${appConfig.appName}`,
                appName: appConfig.appName,
                notification: 'Không tìm thấy vé',
            });
        }
    }

    async generate(req, res) {
        const booking = await Booking.findOne({
            include: ShowTime,
            where: { id: req.params.id },
        });

        if (booking) {
            const qrCodeUrl = await qrcode.toDataURL(
                `${process.env.URL_ROOT || 'http://localhost:3000'}/qrcode/${
                    booking.id
                }`
            );

            res.render('pages/ticket', {
                layout: 'other',
                qrCodeUrl: qrCodeUrl,
                title: appConfig.appName,
            });
        } else {
            res.render('pages/notification', {
                layout: 'other',
                title: `${appConfig.pageTitle.changePassword} | ${appConfig.appName}`,
                appName: appConfig.appName,
                notification: 'Không tìm thấy vé',
            });
        }
    }
}

module.exports = new QRCode();
