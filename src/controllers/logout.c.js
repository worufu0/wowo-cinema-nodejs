class LogoutController {
    // [GET] /logout
    index(req, res) {
        delete req.session.userId;
        delete req.session.passport;
        delete req.user;
        res.redirect('/');
    }
}

module.exports = new LogoutController();
