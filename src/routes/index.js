module.exports = (app) => {
    app.use('/login', require('./login'));
    app.use('/register', require('./register'));
    app.use('/', require('./home'));
    app.use(require('./404'));
};
