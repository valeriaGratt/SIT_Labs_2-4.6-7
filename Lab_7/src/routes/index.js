const studentRoutes = require('./students');

  module.exports  = (app) => {
    app.use('/students', studentRoutes);
  }
  