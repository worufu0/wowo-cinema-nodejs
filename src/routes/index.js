const passportR = require('./passport.r');
const logoutR = require('./logout.r');
const loginR = require('./login.r');
const registerR = require('./register.r');
const homeR = require('./home.r');
const err404R = require('./404.r');

module.exports = (app) => {
    app.use('/passport', passportR);
    app.use('/logout', logoutR);
    app.use('/login', loginR);
    app.use('/register', registerR);
    app.use('/', homeR);
    app.use(err404R);
};
