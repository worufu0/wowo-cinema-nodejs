module.exports = (app) => {
    app.use('/admin', require('./admin.r'));
    app.use('/qrcode', require('./qrcode.r'));
    app.use('/checkout', require('./checkout.r'));
    app.use('/booking', require('./booking.r'));
    app.use('/personal', require('./personal.r'));
    app.use('/cinema', require('./cinema.r'));
    app.use('/movie', require('./movie.r'));
    app.use('/search', require('./search.r'));
    app.use('/recovery', require('./recovery.r'));
    app.use('/passport', require('./passport.r'));
    app.use('/logout', require('./logout.r'));
    app.use('/login', require('./login.r'));
    app.use('/register', require('./register.r'));
    app.use('/', require('./home.r'));
    app.use(require('./404.r'));
};
