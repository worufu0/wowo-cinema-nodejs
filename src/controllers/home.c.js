const { User } = require('../models');

class HomeController {
    // [GET] /
    index(req, res) {
        res.render('pages/home', { title: 'Mua Vé | Wowo Cinema' });
    }
}

module.exports = new HomeController();
