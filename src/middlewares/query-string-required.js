module.exports = (req, res, next) => {
    if (Object.keys(req.query).length !== 0) {
        next();
    } else {
        res.status(404).render('pages/404', {
            layout: 'other',
            title: require('../configs/app').pageTitle.err404,
        });
    }
};
