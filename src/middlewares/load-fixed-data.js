const { Cinema } = require('../models');

module.exports = async (req, res, next) => {
    const cinemas = JSON.parse(JSON.stringify(await Cinema.findAll()));
    res.locals.cinemas = cinemas;
    next();
};
