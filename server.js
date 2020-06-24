const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', require('./routes/index'));

app.use('/css',express.static(__dirname +'/css'));
app.use(express.static('public'));

app.listen(port);
console.log(`Server is listening on port ${port}`);