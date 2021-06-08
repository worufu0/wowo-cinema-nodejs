const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPT_KEY);
const {
    ShowTime,
    Movie,
    Cinema,
    Room,
    RoomType,
    Booking,
    Ticket,
} = require('../models');
const appConfig = require('../configs/app');

class BookingController {
    // [GET] /booking
    async index(req, res) {
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

        let back;
        let bookedSeats = [];
        let seats = [];
        if (showTime) {
            back = req.query.back
                ? cryptr.decrypt(req.query.back)
                : `/movie/${showTime.Movie.unsignedName}?cinema=${showTime.Room.Cinema.unsignedName}`;

            showTime.Bookings.forEach((booking) => {
                booking.Tickets.forEach((ticket) => {
                    bookedSeats.push(ticket.seatName);
                });
            });

            for (let rIndex = 97; rIndex < showTime.Room.row + 97; rIndex++) {
                if (rIndex < 123) {
                    let rArray = [];
                    for (
                        let cIndex = 1;
                        cIndex <= showTime.Room.col;
                        cIndex++
                    ) {
                        const seatName = `${String.fromCharCode(
                            rIndex
                        )}${cIndex}`;
                        if (bookedSeats.includes(seatName)) {
                            rArray.push({
                                booked: true,
                                seatName: seatName,
                            });
                        } else {
                            rArray.push({
                                booked: false,
                                seatName: seatName,
                            });
                        }
                    }
                    seats.push(rArray);
                }
            }
        }

        res.render('pages/booking', {
            title: `${appConfig.pageTitle.booking} | ${appConfig.appName}`,
            showTime: showTime,
            seats: seats,
            back: back,
        });
    }

    // [GET] /select-seat
    selectSeat(req, res) {
        res.json(cryptr.encrypt(req.query.back));
    }
}

module.exports = new BookingController();
