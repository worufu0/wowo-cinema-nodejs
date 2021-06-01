const { User } = require('../models');
const appConfig = require('../configs/app');

class PersonalController {
    // [GET] /personal
    async index(req, res) {
        res.render('pages/personal', {
            title: `${appConfig.pageTitle.personal} | ${appConfig.appName}`,
        });
    }

    // [GET] /personal/edit-info
    async editInfo(req, res) {
        const user = await User.findOne({ where: { id: req.user.id } });

        user[`${req.body.type}`] = req.body.data;
        await user.save();

        res.json(req.body);
    }
}

module.exports = new PersonalController();
