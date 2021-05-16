class LogoutController {
    // [GET] /logout
    index(req, res, next) {
        delete req.session.email;
        res.redirect('/');
    }
}

module.exports = new LogoutController();
