const { Movie, Cinema, Room } = require('../models');
const appConfig = require('../configs/app');

class HomeController {
    // [GET] /
    async index(req, res) {
        const newMovies = await Movie.findAll({
            offset: 0,
            limit: 8,
            order: [['openingDay', 'DESC']],
        });
        const popMovies = await Movie.findAll({
            offset: 0,
            limit: 8,
            order: [['sold', 'DESC']],
        });
        const cinemas = await Cinema.findAll();
        const rooms = await Room.findAll({
            where: {
                cinemaId: 1,
            },
        });

        res.render('pages/home', {
            title: `${appConfig.appName}`,
            appName: appConfig.appName,
            newMovies: newMovies,
            popMovies: popMovies,
            cinemas: cinemas,
            rooms: rooms,
        });
    }
}

module.exports = new HomeController();
