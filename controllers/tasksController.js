const Tasks = require('../models/Tasks');
const Projects = require('../models/Projects');

exports.tasksCreate = async(req, res, next) => {
  const project = await Projects.findOne({where: {
    url: req.params.url
  }});
  const name = req.body.task;
  const status = 0;
  const projectId = project.id;
  let errors = [];

  if(!name){
    errors.push({text: "Name can't be blank"})
  }
  if(errors.length > 0){
    res.render(`/projects/${req.body.url}`, {
      namePage: 'Show Project',
      errors
    });
  } else {
    const task = await Tasks.create({ name: name, status: status, projectId: projectId });
    if(!task) return next();
    
    res.redirect(`/projects/${req.params.url}`);
  }
}

exports.tasksUpdate = async(req,res) => {
  const { id } = req.params;
  const task = await Tasks.findOne({ where: { id }});
  let state = 0;
  if(task.state == state){
    state = 1;
  }
  task.state = state;
  const result = await task.save();

  if(!result) return next();
  res.status(200).send('Updated');

}

exports.tasksDelete = async(req, res, next) => {
  const { id } = req.params;
  const result = await Tasks.destroy({ where: { id: id }});
  if (!result) return next();
  res.status(200).send('Tasks deleted sucessfully');
}