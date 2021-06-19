module.exports = (req, res, next) => {
    req.user.userType === 0 ? next() : res.redirect('back');
};
