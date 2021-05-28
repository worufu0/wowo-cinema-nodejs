const { User } = require('../models');
const appConfig = require('../configs/app');

class PersonalController {
    // [GET] /personal
    async index(req, res) {
        const user = {
            name: req.user.fullName,
            email: req.user.email,
            phone: req.user.phone,
        };

        res.render('pages/personal', {
            title: `${appConfig.pageTitle.personal} | ${appConfig.appName}`,
            user: user,
        });
    }
}

module.exports = new PersonalController();
