const express = require('express');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes');
const db = require('./database');

// HTTP Logger
app.use(logger('dev'));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// Connect database
db.connect();

// Router
router(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
