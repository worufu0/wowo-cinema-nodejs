class PassportController {
    // [GET] /passport/facebook
    facebook(req, res) {
        req.session.userId = req.session.passport.user.id;
        res.redirect('/');
    }

    // [GET] /passport/google
    google(req, res) {
        req.session.userId = req.session.passport.user.id;
        res.redirect('/');
    }
}

module.exports = new PassportController();
