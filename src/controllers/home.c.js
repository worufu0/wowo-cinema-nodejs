const { Movie } = require('../models');
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
        const allMovies = await Movie.findAll();

        res.render('pages/home', {
            title: `${appConfig.pageTitle.home} | ${appConfig.appName}`,
            appName: appConfig.appName,
            newMovies: newMovies,
            popMovies: popMovies,
            allMovies: allMovies,
        });
    }
}

module.exports = new HomeController();
