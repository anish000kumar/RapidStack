const { app: userApp } = require('@app/user');

function registerApps(app) {
  app.use('/user', userApp);
}

module.exports = registerApps;
