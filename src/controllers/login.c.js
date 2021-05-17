const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../models');
const stategyConfig = require('../configs/strategy');
const appConfig = require('../configs/app');

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new FacebookStrategy(
        stategyConfig.facebook,
        async (accessToken, refreshToken, profile, cb) => {
            await User.findOrCreate({
                where: {
                    uuid: profile.id,
                    fullName: profile.displayName,
                    verified: true,
                    userType: 1,
                },
            });
            cb(null, profile);
        }
    )
);

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
            req.session.userId = user.uuid;
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
