const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPT_KEY);
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

        if (cinema) {
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
            const validQuery = cinema.Rooms.find(
                (room) =>
                    room.id === parseInt(req.query.room) || !req.query.room
            );
            const back = cryptr.encrypt(req.originalUrl);

            res.render('pages/cinema', {
                title: `${cinema.name} | ${appConfig.appName}`,
                cinema: cinema,
                movies: movies,
                apiKey: process.env.GG_API_KEY,
                validQuery: validQuery,
                back: back,
            });
        } else {
            res.status(404).render('pages/404', {
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
        const back = cryptr.encrypt(req.query.back);

        if (movies.length !== 0) {
            movies.forEach((movie) => {
                movie.ShowTimes.forEach((ShowTime) => {
                    ShowTime.time = require('moment')(ShowTime.time)
                        .locale('vi')
                        .format('LT DD [/] MM');
                });
            });
        }

        res.json({
            movies: movies,
            back: back,
        });
    }
}

module.exports = new CinemaController();
