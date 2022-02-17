const express = require('express');
const router = express.Router();
//import controllers
const projectsController = require('../controllers/projectsController')

module.exports = function() {
  //home route
  router.get('/', projectsController.projectsHome);
  router.get('/about', projectsController.projectsAbout);
  router.get('/new_project', projectsController.projectsNew);
  router.post('/new_project', projectsController.projectsCreate);
  return router;
}
