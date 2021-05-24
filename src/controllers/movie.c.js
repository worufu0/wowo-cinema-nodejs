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

        const cinema = JSON.parse(
            JSON.stringify(
                await Cinema.findOne({
                    include: {
                        model: Room,
                        //order: [['name', 'ASC']],
                        include: [
                            RoomType,
                            {
                                model: ShowTime,
                                //order: [['time', 'ASC']],
                                where: { movieId: movie.id },
                            },
                        ],
                    },
                    where: {
                        unsignedName:
                            req.query.cinema ||
                            appConfig.queryDefault.cinema.unsignedName,
                    },
                })
            )
        );

        res.render('pages/movie', {
            title: `${movie.name} | ${appConfig.appName}`,
            movie: movie,
            cinema: cinema,
        });
    }
}

module.exports = new MovieController();
