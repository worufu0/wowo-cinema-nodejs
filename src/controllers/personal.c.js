const bcrypt = require('bcrypt');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPT_KEY);
const { User, Booking, ShowTime, Movie, Ticket } = require('../models');
const appConfig = require('../configs/app');

class PersonalController {
    // [GET] /personal
    async index(req, res) {
        const bookings = JSON.parse(
            JSON.stringify(
                await Booking.findAll({
                    include: [
                        Ticket,
                        {
                            model: ShowTime,
                            include: Movie,
                        },
                        {
                            model: User,
                            where: { id: req.user.id },
                        },
                    ],
                })
            )
        );

        res.render('pages/personal', {
            title: `${appConfig.pageTitle.personal} | ${appConfig.appName}`,
            bookings: bookings,
        });
    }

    // [PATCH] /personal/edit-info
    async editInfo(req, res) {
        const user = await User.findOne({ where: { id: req.user.id } });

        user[`${req.body.type}`] = req.body.data;
        await user.save();

        res.json(req.body);
    }

    // [GET] /personal/change-password
    viewChange(req, res) {
        res.render('pages/change', {
            layout: 'other',
            title: `${appConfig.pageTitle.changePassword} | ${appConfig.appName}`,
            appName: appConfig.appName,
        });
    }

    // [PATCH] /personal/change-password
    async changePassword(req, res) {
        const { pass1, pass2, pass3 } = req.body;
        const hashPash = bcrypt.hashSync(pass2, 10);
        const user = await User.findOne({ where: req.user });

        if (user && bcrypt.compareSync(pass1, user.password)) {
            user.password = hashPash;
            await user.save();

            res.render('pages/notification', {
                layout: 'other',
                title: `${appConfig.pageTitle.changePassword} | ${appConfig.appName}`,
                appName: appConfig.appName,
                notification: `Thay đổi mật khẩu thành công.`,
            });
        } else {
            res.render('pages/change', {
                layout: 'other',
                title: `${appConfig.pageTitle.changePassword} | ${appConfig.appName}`,
                appName: appConfig.appName,
                changeErr: 'Mật khẩu cũ không chính xác',
            });
        }
    }
}

module.exports = new PersonalController();
