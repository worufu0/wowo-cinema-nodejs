const express = require('express');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const path = require('path');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');
const passport = require('passport');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes');
const db = require('./database');
const errorHandler = require('./middlewares/error-handler');
const clientErrorHandler = require('./middlewares/client-error-handler');
const logError = require('./middlewares/log-error');
const authentication = require('./middlewares/authentication');
const authorization = require('./middlewares/authorization');
const hbsHelper = require('./helpers/handlebars');

// HTTP Logger
app.use(logger('dev'));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.engine(
    '.hbs',
    exphbs({
        extname: '.hbs',
        helpers: hbsHelper,
    })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// Cookie Session
app.set('trust proxy', 1);
app.use(
    cookieSession({
        name: 'session',
        keys: [process.env.COOKIE_KEY || 'demon'],
        maxAge: 24 * 60 * 60 * 1000,
    })
);

// Method Override
app.use(methodOverride('_method'));

// Error handler
app.use(errorHandler);
app.use(clientErrorHandler);
app.use(logError);

// Connect Database
db.connect();

// Passport
app.use(passport.initialize());

// Authentication and authorization
app.use(authentication);
app.use(authorization);

// Router
router(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
