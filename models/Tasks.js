const Sequelize = require('sequelize');
const db = require('../config/db');
const Projects = require('./Projects');

const Tasks = db.define('tasks', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING, 
  status: Sequelize.STRING
});
Tasks.belongsTo(Projects)

module.exports = Tasks;