const { Movie } = require('../models');

class SearchController {
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
