module.exports = (req, res, next) => {
    if (req.user.userType === 000) {
        next();
    } else {
        res.redirect('back');
    }
};
