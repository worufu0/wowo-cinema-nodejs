const { promisify } = require('util');
const fs = require('fs');
const rename = promisify(fs.rename);
const TokenGenerator = require('uuid-token-generator');
const {
    Movie,
    Cinema,
    Room,
    ShowTime,
    RoomType,
    MovieImage,
    CinemaImage,
} = require('../models');
const nonAccent = require('../helpers/non-accent');
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
            actionRes: req.session.actionRes,
        });

        delete req.session.actionRes;
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
            actionRes: req.session.actionRes,
        });

        delete req.session.actionRes;
    }

    async roomList(req, res) {
        const rooms = JSON.parse(
            JSON.stringify(await Room.findAll({ include: [Cinema, RoomType] }))
        );
        const cinemas = JSON.parse(JSON.stringify(await Cinema.findAll({})));
        const roomTypes = JSON.parse(
            JSON.stringify(await RoomType.findAll({}))
        );

        res.render('pages/admin-list', {
            layout: 'admin',
            title: `${appConfig.pageTitle.admin} | ${appConfig.appName}`,
            item: {
                type: 2,
                list: rooms,
            },
            pathTitle: ['Quản lý', 'Rạp'],
            selectLists: {
                cinemas: cinemas,
                roomTypes: roomTypes,
            },
            actionRes: req.session.actionRes,
        });

        delete req.session.actionRes;
    }

    async showTimeList(req, res) {
        const showTimes = JSON.parse(
            JSON.stringify(await ShowTime.findAll({ include: [Movie, Room] }))
        );
        const movies = JSON.parse(JSON.stringify(await Movie.findAll({})));
        const rooms = JSON.parse(JSON.stringify(await Room.findAll({})));

        res.render('pages/admin-list', {
            layout: 'admin',
            title: `${appConfig.pageTitle.admin} | ${appConfig.appName}`,
            item: {
                type: 3,
                list: showTimes,
            },
            pathTitle: ['Quản lý', 'Suất chiếu'],
            selectLists: {
                movies: movies,
                rooms: rooms,
            },
            actionRes: req.session.actionRes,
        });

        delete req.session.actionRes;
    }

    async movieCreate(req, res) {
        const {
            inputName,
            inputUnsignedName,
            inputCategory,
            inputTimeLong,
            inputCountry,
            inputDirector,
            inputOpeningDay,
            inputVideo,
            inputDescription,
        } = req.body;
        const dateInfos = inputOpeningDay.split('-');
        const videoCode = inputVideo.split('=')[1];
        const unsignedName = inputUnsignedName.split('/')[2];
        const { inputPoster, inputBanner, inputImages } = req.files;
        const movie = await Movie.create({
            name: inputName,
            unsignedName: unsignedName,
            category: inputCategory,
            time: inputTimeLong,
            country: inputCountry,
            director: inputDirector,
            openingDay: new Date(dateInfos[0], dateInfos[1], dateInfos[2]),
            sold: 0,
            video: videoCode,
            image: new TokenGenerator().generate(),
            description: inputDescription,
        });

        if (inputPoster) {
            await rename(
                inputPoster[0].path,
                `src/public/images/movie/poster/poster-${movie.image}.jpg`
            );
        }
        if (inputBanner) {
            await rename(
                inputBanner[0].path,
                `src/public/images/movie/banner/banner-${movie.image}.jpg`
            );
        }
        if (inputImages) {
            inputImages.forEach(async (image) => {
                const movieImageName = new TokenGenerator().generate();

                await MovieImage.create({
                    name: movieImageName,
                    movieId: movie.id,
                });

                await rename(
                    image.path,
                    `src/public/images/movie/image/movie-${movieImageName}.jpg`
                );
            });
        }

        req.session.actionRes = 'add';
        res.redirect('back');
    }

    async cinemaCreate(req, res) {
        const { inputName, inputUnsignedName2, inputAddress } = req.body;
        const unsignedName = inputUnsignedName2.split('/')[2];
        const { inputImages } = req.files;
        const cinema = await Cinema.create({
            name: inputName,
            unsignedName: unsignedName,
            address: inputAddress,
        });

        if (inputImages) {
            const cinemaImageName = new TokenGenerator().generate();

            await CinemaImage.create({
                name: cinemaImageName,
                cinemaId: cinema.id,
            });

            inputImages.forEach(async (image, index) => {
                await rename(
                    image.path,
                    `src/public/images/cinema/cinema-${cinemaImageName}-${
                        index + 1
                    }.jpg`
                );
            });
        }

        req.session.actionRes = 'add';
        res.redirect('back');
    }

    async roomCreate(req, res) {
        const { inputCinema, inputRoomType, inputRow, inputCol } = req.body;
        const cinema = JSON.parse(
            JSON.stringify(await Cinema.findOne({ where: { id: inputCinema } }))
        );

        const [first, ...paths] = cinema.name.split(' ');
        let prefix = '';
        paths.forEach((path) => {
            prefix += nonAccent(path[0]).toUpperCase();
        });

        const rooms = JSON.parse(
            JSON.stringify(
                await Room.findAndCountAll({
                    where: {
                        cinemaId: inputCinema,
                        roomTypeId: inputRoomType,
                    },
                })
            )
        );
        const code = `${inputRoomType}0${rooms.count + 1}`;

        const name = `${prefix} ${code}`;

        await Room.create({
            name: name,
            cinemaId: inputCinema,
            roomTypeId: inputRoomType,
            row: inputRow,
            col: inputCol,
        });

        req.session.actionRes = 'add';
        res.redirect('back');
    }

    async showTimeCreate(req, res) {
        const { inputMovie, inputRoom, inputTime, inputDate, inputPrice } =
            req.body;
        const date = inputDate.split('-');
        const time = inputTime.split(':');
        const dateTime = new Date(
            date[0],
            date[1],
            date[2],
            time[0],
            time[1],
            0
        );

        await ShowTime.create({
            movieId: inputMovie,
            roomId: inputRoom,
            time: dateTime,
            price: inputPrice,
        });

        req.session.actionRes = 'add';
        res.redirect('back');
    }

    async cinemaDelete(req, res) {
        const id = req.body.id;
        const cinemaImage = JSON.parse(
            JSON.stringify(
                await CinemaImage.findOne({ where: { cinemaId: id } })
            )
        );
        const basePath = 'src/public/images/cinema';

        let filenames = fs.readdirSync(basePath);
        filenames.forEach((filename) => {
            if (filename.includes(cinemaImage.name)) {
                const cinemaImagePath = `${basePath}/${filename}`;
                fs.unlinkSync(cinemaImagePath);
            }
        });

        await Cinema.destroy({ where: { id: id } });

        req.session.actionRes = 'delete';
        res.redirect('back');
    }

    async roomDelete(req, res) {
        const id = req.body.id;

        await Room.destroy({ where: { id: id } });

        req.session.actionRes = 'delete';
        res.redirect('back');
    }

    async showTimeDelete(req, res) {
        const id = req.body.id;

        await ShowTime.destroy({ where: { id: id } });

        req.session.actionRes = 'delete';
        res.redirect('back');
    }

    async movieDelete(req, res) {
        const id = req.body.id;
        const movie = JSON.parse(
            JSON.stringify(await Movie.findOne({ where: { id: id } }))
        );
        const movieImages = JSON.parse(
            JSON.stringify(await MovieImage.findAll({ where: { movieId: id } }))
        );
        const basePath = 'src/public/images/movie';
        const posterPath = `${basePath}/poster/poster-${movie.image}.jpg`;
        if (fs.existsSync(posterPath)) {
            fs.unlinkSync(posterPath);
        }

        const bannerPath = `${basePath}/banner/banner-${movie.image}.jpg`;
        if (fs.existsSync(bannerPath)) {
            fs.unlinkSync(bannerPath);
        }

        movieImages.forEach((movieImage) => {
            const movieImagePath = `${basePath}/image/movie-${movieImage.name}.jpg`;
            if (fs.existsSync(movieImagePath)) {
                fs.unlinkSync(movieImagePath);
            }
        });

        await Movie.destroy({ where: movie });

        req.session.actionRes = 'delete';
        res.redirect('back');
    }
}

module.exports = new AdminController();
