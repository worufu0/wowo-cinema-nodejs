const { Op } = require('sequelize');
const { Movie, Room, Cinema } = require('../models');

class SearchController {
    // [GET] /search
    async index(req, res) {
        if (req.query.movie) {
            const movie = await Movie.findOne({
                where: { name: { [Op.iLike]: `%${req.query.movie}%` } },
            });

            if (movie) {
                res.redirect(
                    `/movie/${movie.unsignedName}?cinema=${req.query.cinema}`
                );
            } else {
                req.session.searchResult = false;
                res.redirect('/');
            }
        } else {
            res.redirect(
                `/cinema/${req.query.cinema2}?room=${req.query.room2}`
            );
        }
    }

    // [GET] /search/autocomplete
    async autoComplete(req, res) {
        let movies = await Movie.findAll();

        movies = movies.map((movie) => ({
            label: movie.name,
            value: movie.unsignedName,
        }));

        res.json(movies);
    }

    // [GET] /search/select-room
    async selectRoom(req, res) {
        const rooms = JSON.parse(
            JSON.stringify(
                await Room.findAll({
                    include: [
                        {
                            model: Cinema,
                            where: {
                                unsignedName: req.query.cinema,
                            },
                        },
                    ],
                })
            )
        );

        res.json(rooms);
    }
}

module.exports = new SearchController();
