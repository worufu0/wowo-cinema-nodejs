class LoginController {
    // [GET] /login
    index(req, res) {
        res.render('pages/login', {
            layout: 'other',
            title: 'Đăng Nhập | Wowo Cinema',
        });
    }

    // [POST] /login
    login(req, res) {
        res('ok');
    }
}

module.exports = new LoginController();
