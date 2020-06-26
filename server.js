const express = require('express');
const bodyParser = require('body-parser');
const db = require('./services/db');
const port = process.env.PORT || 3000;

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

// Middlewares
// app.use(require('./middlewares/auth'));


app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/index'));

app.use('/public',express.static(__dirname +'/public'));
app.use('/images',express.static(__dirname +'/images'));
app.use(express.static('public'));

db.sync().then(function () {
    app.listen(port);
    console.log(`Server is listening on port ${port}`);
}).catch(function (err) {
    console.log(err);
});