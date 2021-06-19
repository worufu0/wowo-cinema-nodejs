module.exports = (req, res, next) => {
    Object.keys(req.query).length !== 0
        ? next()
        : res.status(404).render('pages/404', {
              layout: 'other',
              title: require('../configs/app').pageTitle.err404,
          });
};
