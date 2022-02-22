const { Sequelize } = require('sequelize');

const db = new Sequelize('apptasks', 'root', '', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql'
});

var models = [                 
  'Projects'         
];

module.exports = db;