exports.projectsHome = (req, res) => {
  res.render('index', {
    namePage: 'ProjectsApp'
  });
}

exports.projectsAbout = (req, res) => {
  res.render('about');
}

exports.projectsNew = (req, res) => {
  res.render('new_project', {
    namePage: 'New Project'
  });
}

exports.projectsCreate = (req, res) => {
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

  }
}