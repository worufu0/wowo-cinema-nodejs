const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPT_KEY);

module.exports = (req, res, next) => {
    if (!req.user) {
        res.redirect(`/login?back=${cryptr.encrypt(req.originalUrl)}`);
    } else {
        next();
    }
};
