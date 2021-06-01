const { Cinema } = require('../models');

module.exports = async (req, res, next) => {
    res.locals.cinemas = JSON.parse(JSON.stringify(await Cinema.findAll()));
    if (req.user) {
        res.locals.user = {
            id: req.user.id,
            name: req.user.fullName,
            email: req.user.email,
            phone: req.user.phone,
            avatar: req.user.avatar,
            userType: req.user.userType,
        };
    }

    next();
};
