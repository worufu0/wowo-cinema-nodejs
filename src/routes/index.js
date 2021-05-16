module.exports = (app) => {
    app.use('/login', require('./login.r'));
    app.use('/register', require('./register.r'));
    app.use('/', require('./home.r'));
    app.use(require('./404.r'));
};
