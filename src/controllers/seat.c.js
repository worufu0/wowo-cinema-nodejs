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

class SeatController {
    // [GET] /seat
    async index(req, res) {
        if (Object.keys(req.query).length !== 0) {
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

            let bookedSeats = [];
            let seats = [];
            let redirectBack;
            if (showTime) {
                showTime.Bookings.forEach((booking) => {
                    booking.Tickets.forEach((ticket) => {
                        bookedSeats.push(ticket.seatName);
                    });
                });

                for (
                    let rIndex = 65;
                    rIndex < showTime.Room.row + 65;
                    rIndex++
                ) {
                    if (rIndex < 91) {
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

                if (req.query.w === '2') {
                    redirectBack = {
                        route: 'cinema',
                        slug: showTime.Room.Cinema.unsignedName,
                        queryKey: 'room',
                        queryValue: showTime.roomId,
                    };
                } else {
                    redirectBack = {
                        route: 'movie',
                        slug: showTime.Movie.unsignedName,
                        queryKey: 'cinema',
                        queryValue: showTime.Room.Cinema.unsignedName,
                    };
                }
            }

            res.render('pages/seat', {
                title: `${appConfig.pageTitle.seat} | ${appConfig.appName}`,
                redirectBack: redirectBack,
                showTime: showTime,
                seats: seats,
            });
        } else {
            res.status(404).render('pages/404', {
                layout: 'other',
                title: appConfig.pageTitle.err404,
            });
        }
    }

    // [GET] /select-seat
    selectSeat(req, res) {
        let bookedSeats, total, query;
        if (req.query.bookedSeats) {
            bookedSeats = req.query.bookedSeats.join(', ');
            total = (
                req.query.bookedSeats.length *
                req.query.price *
                1000
            ).toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
            });
            query = req.query.bookedSeats.join('+');
        }

        res.json({
            bookedSeats: bookedSeats || 'chưa có',
            total: total || 0,
            href: query
                ? `/checkout?showtime=${req.query.id}&seat=${query}`
                : String.empty,
        });
    }
}

module.exports = new SeatController();
