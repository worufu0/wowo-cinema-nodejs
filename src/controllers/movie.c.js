const {
    Cinema,
    Room,
    RoomType,
    ShowTime,
    Movie,
    MovieImage,
} = require('../models');
const appConfig = require('../configs/app');

class MovieController {
    // [GET] /movie/:unsigndedName
    async index(req, res) {
        const movie = JSON.parse(
            JSON.stringify(
                await Movie.findOne({
                    include: MovieImage,
                    where: { unsignedName: req.params.unsignedName },
                })
            )
        );

        if (movie) {
            const cinema = JSON.parse(
                JSON.stringify(
                    await Cinema.findOne({
                        include: {
                            model: Room,
                            include: [
                                RoomType,
                                {
                                    model: ShowTime,
                                    where: { movieId: movie.id },
                                },
                            ],
                        },
                        where: {
                            unsignedName:
                                req.query.cinema ||
                                appConfig.queryDefault.cinema.unsignedName,
                        },
                        order: [
                            [Room, 'name', 'ASC'],
                            [Room, ShowTime, 'time', 'ASC'],
                        ],
                    })
                )
            );

            res.render('pages/movie', {
                title: `${movie.name} | ${appConfig.appName}`,
                movie: movie,
                cinema: cinema,
                helpers: {
                    formatDate: (date, locale, format) => {
                        return require('moment')(date)
                            .locale(locale)
                            .format(format);
                    },
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

    // [GET] /movie/change-cinema
    async changeCinema(req, res) {
        const cinema = JSON.parse(
            JSON.stringify(
                await Cinema.findOne({
                    include: {
                        model: Room,
                        include: [
                            RoomType,
                            {
                                model: ShowTime,
                                where: {
                                    movieId: req.query.id || null,
                                },
                            },
                        ],
                    },
                    where: {
                        unsignedName:
                            req.query.cinema ||
                            appConfig.queryDefault.cinema.unsignedName,
                    },
                    order: [
                        [Room, 'name', 'ASC'],
                        [Room, ShowTime, 'time', 'ASC'],
                    ],
                })
            )
        );

        if (cinema) {
            cinema.Rooms.forEach((Room) => {
                Room.ShowTimes.forEach((ShowTime) => {
                    ShowTime.time = require('moment')(ShowTime.time)
                        .locale('vi')
                        .format('LT DD [/] MM');
                });
            });
        }

        res.json(cinema);
    }
}

module.exports = new MovieController();
