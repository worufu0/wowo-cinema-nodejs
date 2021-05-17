class LogoutController {
    // [GET] /logout
    index(req, res) {
        delete req.session.userId;
        delete req.session.passport;
        res.redirect('/');
    }
}

module.exports = new LogoutController();
