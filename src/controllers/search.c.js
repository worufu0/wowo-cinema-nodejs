const { Op } = require('sequelize');
const { Movie } = require('../models');

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
                res.send('not found');
            }
        } else {
            res.send('empty');
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
}

module.exports = new SearchController();
