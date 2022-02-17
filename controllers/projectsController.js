exports.projectsHome = (req, res) => {
  res.render('index');
}

exports.projectsAbout = (req, res) => {
  res.send('About Us');
}