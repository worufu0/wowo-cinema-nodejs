const nodemailer = require('nodemailer');
const TokenGenerator = require('uuid-token-generator');
const { User } = require('../models');
const mailConfig = require('../configs/email');
const appConfig = require('../configs/app');

class RegisterController {
    // [GET] /register
    index(req, res) {
        res.render('pages/register', {
            layout: 'other',
            title: `${appConfig.pageTitle.register} | ${appConfig.appName}`,
            appName: appConfig.appName,
        });
    }

    // [POST] /register
    async register(req, res) {
        const transporter = nodemailer.createTransport(mailConfig);
        const uuid = new TokenGenerator().generate();
        const token = new TokenGenerator(256, TokenGenerator.BASE62).generate();
        const { email, pass1, pass2 } = req.body;
        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (user) {
            res.render('pages/register', {
                layout: 'other',
                title: `${appConfig.pageTitle.register} | ${appConfig.appName}`,
                appName: appConfig.appName,
                regErr: 'Địa chỉ email đã được sử dụng',
            });
        } else {
            await User.findOrCreate({
                where: {
                    uuid: uuid,
                    email: email,
                    password: pass1,
                    userType: 0,
                },
            });

            await User.update(
                { token: token },
                {
                    where: {
                        email: email,
                    },
                }
            );

            await transporter.sendMail({
                from: mailConfig.auth.user,
                to: email,
                subject: `Xác minh tài khoản ${appConfig.appName}`,
                text: `Chào mừng bạn đến với ${appConfig.appName}`,
                html: `
                <h1>Chào mừng bạn đến với ${appConfig.appName}</h1>
                </br>
                <h3>Vui lòng xác minh địa chỉ email bạn dùng để đăng ký tài khoản ${appConfig.appName}.</h3>
                </br>
                <p>Vui lòng click vào link bên dưới để xác nhận email của bạn.</p>
                <a href="${appConfig.urlRoot}/register/verify/${token}" style="margin-bottom: 16px">${appConfig.urlRoot}/register/verify/${token}</a>
                </br>
                <h4>Wowo Admin</h4>
                `,
            });

            res.render('pages/notification', {
                layout: 'other',
                title: `${appConfig.pageTitle.register} | ${appConfig.appName}`,
                appName: appConfig.appName,
                notification:
                    'Chúc mừng bạn đã đăng ký thành công. Để hoàn tất đăng ký, vui lòng kiểm tra hộp thư để xác minh tài khoản !',
            });
        }
    }

    // [GET] /register/verify/:token
    async verify(req, res) {
        const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
        const user = await User.findOne({
            where: {
                token: req.params.token,
            },
        });

        if (user && user.verified === false) {
            await User.update(
                { verified: true, token: tokgen.generate() },
                {
                    where: {
                        token: req.params.token,
                    },
                }
            );

            res.render('pages/notification', {
                layout: 'other',
                title: `${appConfig.pageTitle.register} | ${appConfig.appName}`,
                appName: appConfig.appName,
                notification: `Xác mình tài khoản thành công. Bây giờ bạn có thể sử dụng tài khoản để đăng nhập vào ${appConfig.appName} !`,
            });
        } else {
            res.render('pages/404', {
                layout: 'other',
                title: appConfig.pageTitle.err404,
            });
        }
    }
}

module.exports = new RegisterController();
