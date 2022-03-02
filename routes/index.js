const express = require('express');
const router = express.Router();

// import express validator
const { body } = require('express-validator');

//import controllers
const projectsController = require('../controllers/projectsController')
const tasksController = require('../controllers/tasksController')

module.exports = function() {
  //Projects
  router.get('/', projectsController.projectsHome);
  router.get('/about', projectsController.projectsAbout);
  router.get('/new_project', projectsController.projectsNew);
  router.post('/new_project', body('name').not().isEmpty().trim().escape(), projectsController.projectsCreate);
  router.get('/projects/:url', projectsController.projectsShow);
  router.get('/projects/:id/edit', projectsController.projectsEdit);
  router.post('/projects/:id/update', body('name').not().isEmpty().trim().escape(), projectsController.projectsUpdate);
  router.delete('/projects/:url', projectsController.projectsDelete);

  //Tasks
  router.post('/tasks/:url', tasksController.tasksCreate);
  router.patch('/tasks/:id', tasksController.tasksUpdate);
  router.delete('/tasks/:id', tasksController.tasksDelete);
  
  return router;
}
