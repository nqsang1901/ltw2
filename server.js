const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const db = require('./services/db');
const port = process.env.PORT || 3000;

const app = express();

// Session
app.use(cookieSession({
    name: 'session',
    keys: ['123456'],
    maxAge: 24 * 60 * 60 * 1000,
}))

app.set('views', './views');
app.set('view engine', 'ejs');

// Middlewares
app.use(require('./middlewares/auth'));


app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.get('/logout', require('./routes/logout'));

app.use('/public',express.static(__dirname +'/public'));
// app.use('/images',express.static(__dirname +'/'));
// app.use('/images',express.static(__dirname +'/images'));
app.use(express.static('public'));

db.sync().then(function () {
    app.listen(port);
    console.log(`Server is listening on port ${port}`);
}).catch(function (err) {
    console.log(err);
});