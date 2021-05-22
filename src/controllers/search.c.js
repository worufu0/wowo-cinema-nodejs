const { Movie } = require('../models');

class SearchController {
    // [GET] /search
    async index(req, res) {
        if (req.query.movie === '') {
            console.log(1);
        } else {
            console.log(2);
        }

        res.json(req.query);
    }

    // [GET] /search/autocomplete
    async getSource(req, res) {
        let movies = await Movie.findAll();
        movies = movies.map((movie) => ({
            label: movie.name,
            value: movie.unsignedName,
        }));

        res.json(movies);
    }
}

module.exports = new SearchController();
