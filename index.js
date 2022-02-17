const express = require('express');
const routes = require('./routes');
const path = require('path');

// create express app
const app = express();

// enable pug
app.set('view engine', 'pug')

// load views
app.set('views', path.join(__dirname, './views'))

// home routes
app.use('/', routes());

app.listen(3000);