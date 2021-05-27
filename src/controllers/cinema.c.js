const {
    Cinema,
    CinemaImage,
    Room,
    Movie,
    ShowTime,
    RoomType,
} = require('../models');
const appConfig = require('../configs/app');

class CinemaController {
    // [GET] /cinema/:unsignedName
    async index(req, res) {
        const cinema = JSON.parse(
            JSON.stringify(
                await Cinema.findOne({
                    include: [
                        CinemaImage,
                        {
                            model: Room,
                            include: RoomType,
                        },
                    ],
                    where: { unsignedName: req.params.unsignedName },
                })
            )
        );

        if (
            cinema &&
            cinema.Rooms.find(
                (room) =>
                    room.id === parseInt(req.query.room) || !req.query.room
            )
        ) {
            const movies = JSON.parse(
                JSON.stringify(
                    await Movie.findAll({
                        include: [
                            {
                                model: ShowTime,
                                where: {
                                    roomId:
                                        req.query.room || cinema.Rooms[0].id,
                                },
                            },
                        ],
                    })
                )
            );

            res.render('pages/cinema', {
                title: `${cinema.name} | ${appConfig.appName}`,
                cinema: cinema,
                movies: movies,
                helpers: {
                    formatDateTime: (dateTime, locale, format) => {
                        return require('moment')(dateTime)
                            .locale(locale)
                            .format(format);
                    },
                },
            });
        } else {
            res.render('pages/404', {
                layout: 'other',
                title: appConfig.pageTitle.err404,
            });
        }
    }

    // [GET] /cinema/change-room
    async changeRoom(req, res) {
        const movies = JSON.parse(
            JSON.stringify(
                await Movie.findAll({
                    include: [
                        {
                            model: ShowTime,
                            where: {
                                roomId: req.query.room || null,
                            },
                        },
                    ],
                })
            )
        );

        if (movies.length !== 0) {
            movies.forEach((movie) => {
                movie.ShowTimes.forEach((ShowTime) => {
                    ShowTime.time = require('moment')(ShowTime.time)
                        .locale('vi')
                        .format('LT DD [/] MM');
                });
            });
        }

        res.json(movies);
    }
}

module.exports = new CinemaController();
