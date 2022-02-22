const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./config/db');

//import models
require('./models/Projects');
// connect to db
async function connect_db() {
  try {
    await db.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connect_db();
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