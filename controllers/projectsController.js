const Projects = require('../models/Projects');
const Tasks = require('../models/Tasks');
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
    await Projects.create({ name })
    res.redirect('/');
  }
}

exports.projectsShow = async (req, res) => {
  const projectsPromise = Projects.findAll();
  const projectPromise = Projects.findOne({
    where: { 
      url: req.params.url 
    }
  });

  const [projects, project] = await Promise.all([projectsPromise, projectPromise]);
  const tasks = await Tasks.findAll({ 
    where: {
      projectId: project.id
    },
    include: [
      { model: Projects }
    ]
  });

  if(!project) return next();

  res.render('show', {
    namePage: 'Show Project',
    projects,
    project,
    tasks
  });
}

exports.projectsEdit = async (req, res) => {
  const projectsPromise = Projects.findAll();
  const projectPromise = Projects.findOne({
    where: { 
      id: req.params.id 
    }
  });

  const [projects, project] = await Promise.all([projectsPromise, projectPromise]);

  res.render('new_project', {
    namePage: 'Edit Project',
    projects,
    project
  });
}

exports.projectsUpdate = async(req, res) => {
  const name = req.body.name;
  let errors = [];

  if(!name){
    errors.push({text: "Name can't be blank"})
  }

  const projectsPromise = Projects.findAll();
  const projectPromise = Projects.findOne({
    where: { 
      id: req.params.id 
    }
  });
  const [projects, project] = await Promise.all([projectsPromise, projectPromise]);

  if(errors.length > 0){
    res.render('new_project', {
      namePage: 'New Project',
      errors,
      projects,
      project
    });
  } else {
    await Projects.update(
      { name: name },
      { where: { id: req.params.id }}
    );
    res.redirect('/');
  }
}

exports.projectsDelete = async(req, res, next) => {
  const {url} = req.params;
  const result = await Projects.destroy({ where: { url: url }});
  res.status(200).send('Project deleted sucessfully');
}