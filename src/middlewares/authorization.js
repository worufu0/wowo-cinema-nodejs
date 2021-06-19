module.exports = (req, res, next) => {
    const user = req.user;

    if (user?.admin === false) {
        if (req.originalUrl.split('/')[1] === 'admin') {
            res.redirect('/');
        }
    }

    next();
};
