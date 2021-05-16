const appConfig = require('../configs/app');

module.exports = (req, res) => {
    res.render('pages/404', {
        layout: 'other',
        title: appConfig.pageTitle.err404,
    });
};
