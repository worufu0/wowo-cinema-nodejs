const { Movie, Cinema, MovieImage } = require('../models');
const appConfig = require('../configs/app');

class MovieController {
    // [GET] /movie/:unsigndedName
    async index(req, res) {
        const cinemas = await Cinema.findAll();
        const movie = await Movie.findOne({
            where: {
                unsignedName: req.params.unsignedName,
            },
        });

        const images = await MovieImage.findAll({
            where: { movieId: movie.dataValues.id },
        });

        res.render('pages/movie', {
            title: `${movie.name} | ${appConfig.appName}`,
            cinemas: cinemas,
            movie: movie,
            images: images,
        });
    }
}

module.exports = new MovieController();
