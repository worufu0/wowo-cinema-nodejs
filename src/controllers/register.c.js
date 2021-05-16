const nodemailer = require('nodemailer');
const TokenGenerator = require('uuid-token-generator');
const { User } = require('../models');
const appConfig = require('../config/app');
const mailConfig = require('../config/email');

class RegisterController {
    // [GET] /register
    index(req, res) {
        res.render('pages/register', {
            layout: 'other',
            title: 'Đăng Ký | Wowo Cinema',
        });
    }

    // [POST] /register
    async register(req, res) {
        const transporter = nodemailer.createTransport(mailConfig);
        const token = new TokenGenerator(256, TokenGenerator.BASE62).generate();
        const data = new URLSearchParams(req.body.data);
        const email = data.get('email');
        const pass = data.get('pass1');

        await User.findOrCreate({
            where: {
                email: email,
                password: pass,
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
            subject: 'Xác minh tài khoản Wowo Cinama',
            text: 'Chào mừng bạn đến với Wowo Cinama',
            html: `
            <h1>Chào mừng bạn đến với Wowo Cinema</h1>
            </br>
            <h3>Vui lòng xác minh địa chỉ email bạn dùng để đăng ký tài khoản Wowo Cinema.</h3>
            </br>
            <p>Vui lòng click vào link bên dưới để xác nhận email của bạn.</p>
            <a href="${appConfig.urlRoot}/register/verify/${token}" style="margin-bottom: 16px">${appConfig.urlRoot}/register/verify/${token}</a>
            </br>
            <h4>Wowo Admin</h4>
            `,
        });

        res.render('pages/notification', {
            layout: 'other',
            title: 'Đăng Ký | Wowo Cinema',
            notification:
                'Chúc mừng bạn đã đăng ký thành công. Để hoàn tất đăng ký, vui lòng kiểm tra hộp thư để xác minh tài khoản !',
        });
    }

    // [POST] /register/validate
    async validate(req, res) {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (user) {
            res.send('Địa chỉ email đã được sử dụng');
        } else {
            res.send(true);
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
                title: 'Đăng Ký | Wowo Cinema',
                notification:
                    'Xác mình tài khoản thành công. Bây giờ bạn có thể sử dụng tài khoản để đăng nhập vào Wowo Cinema !',
            });
        } else {
            res.render('pages/404', {
                layout: 'other',
                title: 'Không tìm thấy trang',
            });
        }
    }
}

module.exports = new RegisterController();
