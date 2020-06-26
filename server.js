const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

// Middlewares
// app.use(require('./middlewares/auth'));


app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));

app.use('/public',express.static(__dirname +'/public'));
app.use('/images',express.static(__dirname +'/images'));
app.use(express.static('public'));

app.listen(port);
console.log(`Server is listening on port ${port}`);