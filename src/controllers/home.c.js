const { Movie, Cinema } = require('../models');
const appConfig = require('../configs/app');

class HomeController {
    // [GET] /
    async index(req, res) {
        const newMovies = JSON.parse(
            JSON.stringify(
                await Movie.findAll({
                    offset: 0,
                    limit: 8,
                    order: [['openingDay', 'DESC']],
                })
            )
        );

        const popMovies = JSON.parse(
            JSON.stringify(
                await Movie.findAll({
                    offset: 0,
                    limit: 8,
                    order: [['sold', 'DESC']],
                })
            )
        );

        res.render('pages/home', {
            title: `${appConfig.appName}`,
            appName: appConfig.appName,
            newMovies: newMovies,
            popMovies: popMovies,
        });
    }
}

module.exports = new HomeController();
