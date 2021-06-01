const seatR = require('./seat.r');
const personalR = require('./personal.r');
const cinemaR = require('./cinema.r');
const movieR = require('./movie.r');
const searchR = require('./search.r');
const recoveryR = require('./recovery.r');
const passportR = require('./passport.r');
const logoutR = require('./logout.r');
const loginR = require('./login.r');
const registerR = require('./register.r');
const homeR = require('./home.r');
const err404R = require('./404.r');

module.exports = (app) => {
    app.use('/seat', seatR);
    app.use('/personal', personalR);
    app.use('/cinema', cinemaR);
    app.use('/movie', movieR);
    app.use('/search', searchR);
    app.use('/recovery', recoveryR);
    app.use('/passport', passportR);
    app.use('/logout', logoutR);
    app.use('/login', loginR);
    app.use('/register', registerR);
    app.use('/', homeR);
    app.use(err404R);
};
