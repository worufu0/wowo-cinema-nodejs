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

    // [POST] /select
    async select(req, res) {
        const rooms = await Room.findAll({
            where: {
                cinemaId: req.body.id,
            },
        });
        const current = rooms[0].dataValues.name;

        let result = '';
        for (const room of rooms) {
            rooms.indexOf(room) === 0
                ? (result += `<li data-value="${room.dataValues.id}" class="option selected">${room.dataValues.name}</li>`)
                : (result += `<li data-value="${room.dataValues.id}" class="option">${room.dataValues.name}</li>`);
        }

        res.json({ current: current, result: result });
    }
}

module.exports = new HomeController();
