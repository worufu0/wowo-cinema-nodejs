const express = require('express');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// View Engine
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('pages/home', { title: 'Mua Vé | Wowo Cinema' });
});

app.get('/login', (req, res) => {
    res.render('pages/login', {
        layout: 'other',
        title: 'Đăng Nhập | Wowo Cinema',
    });
});

app.get('/register', (req, res) => {
    res.render('pages/register', {
        layout: 'other',
        title: 'Đăng Ký | Wowo Cinema',
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
