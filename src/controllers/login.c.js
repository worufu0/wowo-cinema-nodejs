const bcrypt = require('bcrypt');
const { User } = require('../models');
const appConfig = require('../configs/app');
const passport = require('../libs/passport').call();

class LoginController {
    // [GET] /login
    index(req, res) {
        let rememberEmail, rememberPass, status;

        if (req.remember) {
            rememberEmail = req.remember.user.email;
            rememberPass = req.remember.user.pass;
            status = req.remember.status;
        }

        res.render('pages/login', {
            layout: 'other',
            title: `${appConfig.pageTitle.login} | ${appConfig.appName}`,
            appName: appConfig.appName,
            rememberEmail: rememberEmail,
            rememberPass: rememberPass,
            status: status,
        });
    }

    // [POST] /login
    async login(req, res) {
        const { email, pass, remember } = req.body;
        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (user && bcrypt.compareSync(pass, user.password)) {
            req.session.userId = user.id;

            remember === 'on'
                ? (req.session.remember = {
                      email: email,
                      pass: pass,
                  })
                : delete req.session.remember;

            res.redirect('/');
        } else {
            res.render('pages/login', {
                layout: 'other',
                title: `${appConfig.pageTitle.login} | ${appConfig.appName}`,
                appName: appConfig.appName,
                logErr: 'Thông tin đăng nhập không chính xác',
            });
        }
    }
}

module.exports = new LoginController();
