const { Movie } = require('../models');
const appConfig = require('../configs/app');

class MovieController {
    // [GET] /movie/:unsigndedName
    async index(req, res) {
        const movie = await Movie.findOne({
            where: {
                unsignedName: req.params.unsignedName,
            },
        });

        res.render('pages/movie', {
            title: `${movie.name} | ${appConfig.appName}`,
            movie: movie,
        });
    }
}

module.exports = new MovieController();
