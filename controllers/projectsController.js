const Projects = require('../models/Projects');
const slug = require('slug');
const { nextTick } = require('process');

exports.projectsHome = async (req, res) => {
  const projects = await Projects.findAll();
  res.render('index', {
    namePage: 'ProjectsApp',
    projects
  });
}

exports.projectsAbout = async (req, res) => {
  res.render('about');
}

exports.projectsNew = async (req, res) => {
  const projects = await Projects.findAll();
  res.render('new_project', {
    namePage: 'New Project',
    projects
  });
}

exports.projectsCreate = async(req, res) => {
  const { name } = req.body;
  let errors = [];

  if(!name){
    errors.push({text: "Name can't be blank"})
  }

  if(errors.length > 0){
    res.render('new_project', {
      namePage: 'New Project',
      errors
    });
  } else {
    const project = await Projects.create({ name })
    res.redirect('/');
  }
}

exports.projectsShow = async (req, res) => {
  const projects = await Projects.findAll();
  const project = await Projects.findOne({
    where: { 
      url: req.params.url 
    }
  });

  if(!project) return next();

  res.render('show', {
    namePage: 'Show Project',
    projects,
    project
  });
}