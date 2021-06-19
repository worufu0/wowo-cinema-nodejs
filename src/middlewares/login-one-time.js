module.exports = (req, res, next) => {
    req.user ? res.redirect('/') : next();
};
