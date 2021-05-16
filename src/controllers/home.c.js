const appConfig = require('../configs/app');

class HomeController {
    // [GET] /
    index(req, res) {
        res.render('pages/home', {
            title: `${appConfig.pageTitle.home} | ${appConfig.appName}`,
            appName: appConfig.appName,
        });
    }
}

module.exports = new HomeController();
