const { Movie, Cinema, Room, ShowTime, RoomType } = require('../models');
const appConfig = require('../configs/app');

class AdminController {
    index(req, res) {
        res.render('pages/admin-dashboard', {
            layout: 'admin',
            title: `${appConfig.pageTitle.admin} | ${appConfig.appName}`,
        });
    }

    async movieList(req, res) {
        const movies = JSON.parse(JSON.stringify(await Movie.findAll()));

        res.render('pages/admin-list', {
            layout: 'admin',
            title: `${appConfig.pageTitle.admin} | ${appConfig.appName}`,
            item: {
                type: 0,
                list: movies,
            },
            pathTitle: ['Quản lý', 'Phim'],
        });
    }

    async cinemaList(req, res) {
        const cinemas = JSON.parse(JSON.stringify(await Cinema.findAll()));

        res.render('pages/admin-list', {
            layout: 'admin',
            title: `${appConfig.pageTitle.admin} | ${appConfig.appName}`,
            item: {
                type: 1,
                list: cinemas,
            },
            pathTitle: ['Quản lý', 'Cụm rạp'],
        });
    }

    async roomList(req, res) {
        const rooms = JSON.parse(
            JSON.stringify(await Room.findAll({ include: [Cinema, RoomType] }))
        );

        res.render('pages/admin-list', {
            layout: 'admin',
            title: `${appConfig.pageTitle.admin} | ${appConfig.appName}`,
            item: {
                type: 2,
                list: rooms,
            },
            pathTitle: ['Quản lý', 'Rạp'],
        });
    }

    async showTimeList(req, res) {
        const showTimes = JSON.parse(
            JSON.stringify(await ShowTime.findAll({ include: [Movie, Room] }))
        );

        res.render('pages/admin-list', {
            layout: 'admin',
            title: `${appConfig.pageTitle.admin} | ${appConfig.appName}`,
            item: {
                type: 3,
                list: showTimes,
            },
            pathTitle: ['Quản lý', 'Suất chiếu'],
        });
    }

    logout(req, res) {
        delete req.session.userId;
        delete req.session.passport;
        delete req.user;
        res.redirect('/');
    }
}

module.exports = new AdminController();
