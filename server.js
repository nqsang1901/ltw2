const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const db = require('./services/db');
const port = process.env.PORT || 3000;

const path = require('path');

const app = express();

// Session
app.use(cookieSession({
    name: 'session',
    keys: ['123456'],
    maxAge: 24 * 60 * 60 * 1000,
}))

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// Middlewares
app.use(require('./middlewares/auth'));

app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.get('/logout', require('./routes/logout'));
app.use('/profile', require('./routes/profile'));
app.use('/transfer', require('./routes/transfer'));
app.use('/admin', require('./routes/admin'));
app.use('/Deposit', require('./routes/SavingDeposit'));
app.use('/registeraccount', require('./routes/registeraccount'));
// app.get('*', require('./routes/error'));


app.use(express.static(__dirname + '/public'));
app.use('/public',express.static(__dirname +'/public'));
app.use('/profile',express.static(__dirname +'/public'));
app.use('/admin',express.static(__dirname +'/views/Admin'));
app.use('/admin/rechargeAccount',express.static(__dirname +'/views/Admin'));
app.use('/admin/withdrawAccount',express.static(__dirname +'/views/Admin'));
app.use('/admin/edituser',express.static(__dirname +'/views/Admin'));
app.use('/admin/watchUser',express.static(__dirname +'/views/Admin'));
app.use('/admin/accountverification',express.static(__dirname +'/views/Admin'));


app.use(express.static('public'));

db.sync().then(function () {
    app.listen(port);
    console.log(`Server is listening on port ${port}`);
}).catch(function (err) {
    console.log(err);
});