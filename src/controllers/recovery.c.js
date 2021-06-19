const nodemailer = require('nodemailer');
const TokenGenerator = require('uuid-token-generator');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const mailConfig = require('../configs/email');
const appConfig = require('../configs/app');

class RecoveryController {
    // [GET] /recovery
    index(req, res) {
        res.render('pages/recovery', {
            layout: 'other',
            title: `${appConfig.pageTitle.recovery} | ${appConfig.appName}`,
            appName: appConfig.appName,
        });
    }

    // [POST] /recovery
    async recovery(req, res) {
        const transporter = nodemailer.createTransport(mailConfig);
        const token = new TokenGenerator(256, TokenGenerator.BASE62).generate();
        const { email, pass } = req.body;
        const user = await User.findOne({
            where: {
                email: email,
                userType: 0,
                admin: false,
                mailVerified: true,
            },
        });

        if (!user) {
            res.render('pages/recovery', {
                layout: 'other',
                title: `${appConfig.pageTitle.recovery} | ${appConfig.appName}`,
                appName: appConfig.appName,
                recErr: 'Địa chỉ email không khớp với bất kỳ tài khoản nào',
            });
        } else {
            await transporter.sendMail({
                from: mailConfig.auth.user,
                to: email,
                subject: `Khôi phục mật khẩu ${appConfig.appName}`,
                text: `Đặt lại  mật khẩu`,
                html: `
                <p>Vui lòng click vào link bên dưới để đặt lại mật khẩu.</p>
                <a href="${
                    process.env.URL_ROOT || 'http://localhost:3000'
                }/recovery/${token}" style="margin-bottom: 16px">${
                    process.env.URL_ROOT || 'http://localhost:3000'
                }/recovery/${token}</a>
                </br>
                <h4>Wowo Admin</h4>
                `,
            });

            await User.update({ token: token }, { where: { email: email } });

            res.render('pages/notification', {
                layout: 'other',
                title: `${appConfig.pageTitle.recovery} | ${appConfig.appName}`,
                appName: appConfig.appName,
                notification: `Vui lòng kiểm tra hộp thư ${email} để đặt lại mật khẩu !`,
            });
        }
    }

    // [GET] /recovery/:token
    async reset(req, res) {
        const user = await User.findOne({
            where: { token: req.params.token },
        });

        if (user) {
            res.render('pages/reset', {
                layout: 'other',
                title: `${appConfig.pageTitle.reset} | ${appConfig.appName}`,
                appName: appConfig.appName,
            });
        } else {
            res.status(404).render('pages/404', {
                layout: 'other',
                title: appConfig.pageTitle.err404,
            });
        }
    }

    // [PATCH] /recovery/:token
    async change(req, res) {
        const token = new TokenGenerator(256, TokenGenerator.BASE62).generate();
        const hashPash = bcrypt.hashSync(req.body.pass1, 10);

        await User.update(
            { password: hashPash, token: token },
            { where: { token: req.params.token } }
        );

        res.render('pages/notification', {
            layout: 'other',
            title: `${appConfig.pageTitle.reset} | ${appConfig.appName}`,
            appName: appConfig.appName,
            notification: `Đặt lại mật khẩu thành công.`,
        });
    }
}

module.exports = new RecoveryController();
