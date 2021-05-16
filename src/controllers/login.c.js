const { User } = require('../models');
const appConfig = require('../configs/app');

class LoginController {
    // [GET] /login
    index(req, res) {
        res.render('pages/login', {
            layout: 'other',
            title: `${appConfig.pageTitle.login} | ${appConfig.appName}`,
            appName: appConfig.appName,
        });
    }

    // [POST] /login
    async login(req, res) {
        const { email, pass } = req.body;
        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (user && user.password === pass) {
            req.session.email = user.email;
            res.redirect('/');
        } else {
            res.render('pages/login', {
                layout: 'other',
                title: `${appConfig.pageTitle.login} | ${appConfig.appName}`,
                appName: appConfig.appName,
                authErr: 'Thông tin đăng nhập không chính xác',
            });
        }
    }
}

module.exports = new LoginController();
