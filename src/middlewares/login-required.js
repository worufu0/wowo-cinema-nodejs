const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPT_KEY || 'wolf');

module.exports = (req, res, next) => {
    !req.user
        ? res.redirect(`/login?back=${cryptr.encrypt(req.originalUrl)}`)
        : next();
};
