const express = require('express');
const router = express.Router();

// import express validator
const { body } = require('express-validator/check');

//import controllers
const projectsController = require('../controllers/projectsController')

module.exports = function() {
  //home route
  router.get('/', projectsController.projectsHome);
  router.get('/about', projectsController.projectsAbout);
  router.get('/new_project', projectsController.projectsNew);
  router.post('/new_project', body('name').not().isEmpty().trim().escape(), projectsController.projectsCreate);
  return router;
}
