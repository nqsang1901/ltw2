const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }));

<<<<<<< HEAD
app.get('/', require('./routes/index'));
app.get('/login', require('./routes/login'));
=======
app.use('/', require('./routes/index'));
>>>>>>> e9131ad34cc393afc4620c45f1a764db21b90fe2

app.use('/css',express.static(__dirname +'/css'));
app.use('/images',express.static(__dirname +'/images'));
app.use(express.static('public'));

app.listen(port);
console.log(`Server is listening on port ${port}`);