const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPT_KEY || 'wolf');
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
            const back = cryptr.encrypt(req.originalUrl);

            res.render('pages/movie', {
                title: `${movie.name} | ${appConfig.appName}`,
                movie: movie,
                cinema: cinema,
                back: back,
            });
        } else {
            res.status(404).render('pages/404', {
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
        const back = cryptr.encrypt(req.query.back);

        if (cinema) {
            cinema.Rooms.forEach((Room) => {
                Room.ShowTimes.forEach((ShowTime) => {
                    ShowTime.time = require('moment')(ShowTime.time)
                        .locale('vi')
                        .format('LT DD [/] MM');
                });
            });
        }

        res.json({
            cinema: cinema,
            back: back,
        });
    }

    // [GET] /movie/all
    async all(req, res) {
        if (req.query.page === '0') {
            res.redirect('/movie/all');
        } else if (req.query.page < 0) {
            res.redirect(`/movie/all?page=${-req.query.page}`);
        } else {
            // Query and paging
            const pageSize = 12;
            const currentPage = parseInt(req.query.page) || 1;
            const movies = JSON.parse(
                JSON.stringify(
                    await Movie.findAndCountAll({
                        offset: (currentPage - 1) * pageSize,
                        limit: pageSize,
                    })
                )
            );
            const totalPage = Math.ceil(movies.count / pageSize);
            const pageNumberArray = [];
            let max, min;
            if (currentPage === 1) {
                pageNumberArray.push(
                    { value: null },
                    { value: currentPage, active: 'active' },
                    { value: currentPage + 1 }
                );
                min = true;
            } else if (currentPage === totalPage) {
                pageNumberArray.push(
                    { value: currentPage - 1 },
                    { value: currentPage, active: 'active' },
                    { value: null }
                );
                max = true;
            } else {
                pageNumberArray.push(
                    { value: currentPage - 1 },
                    { value: currentPage, active: 'active' },
                    { value: currentPage + 1 }
                );
            }

            res.render('pages/all', {
                title: `${appConfig.pageTitle.movie} | ${appConfig.appName}`,
                movies: movies,
                pageNumberArray: pageNumberArray,
                currentPage: currentPage,
                min: min,
                max: max,
            });
        }
    }
}

module.exports = new MovieController();
