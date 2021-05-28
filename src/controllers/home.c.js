const { Movie, Room } = require('../models');
const appConfig = require('../configs/app');

class HomeController {
    // [GET] /
    async index(req, res) {
        const rooms = JSON.parse(
            JSON.stringify(
                await Room.findAll({
                    where: {
                        cinemaId: appConfig.queryDefault.cinema.id,
                    },
                })
            )
        );

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

        let searchResponse;
        if (req.session.searchResult === false) {
            searchResponse = 'Không tìm thấy kết quả phù hợp.';
        }
        delete req.session.searchResult;

        res.render('pages/home', {
            title: appConfig.appName,
            appName: appConfig.appName,
            rooms: rooms,
            newMovies: newMovies,
            popMovies: popMovies,
            searchResponse: searchResponse,
        });
    }
}

module.exports = new HomeController();
