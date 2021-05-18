module.exports = async (req, res, next) => {
    if (req.session.remember) {
        req.remember = { user: req.session.remember, status: 'checked' };
    }
    next();
};
