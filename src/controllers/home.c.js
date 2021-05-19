const { Movie } = require('../models');
const appConfig = require('../configs/app');

class HomeController {
    // [GET] /
    async index(req, res) {
        const movies = await Movie.findAll();

        res.render('pages/home', {
            title: `${appConfig.pageTitle.home} | ${appConfig.appName}`,
            appName: appConfig.appName,
            movies: movies,
        });
    }
}

module.exports = new HomeController();
