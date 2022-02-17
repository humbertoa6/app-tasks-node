const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

// create express app
const app = express();

// load public folder
app.use(express.static('public'))

// enable pug
app.set('view engine', 'pug')

// load views
app.set('views', path.join(__dirname, './views'))

// enable body parser
app.use(bodyParser.urlencoded({extended: true}));

// home routes
app.use('/', routes());

app.listen(3000);