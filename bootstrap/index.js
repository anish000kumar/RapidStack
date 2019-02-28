const { Router } = require('express');
const registerApps = require('@app');
const config = require('@config');
const log = require('@helpers/log');
const path = require('path');
const filepath = path.join(__dirname, '@root/routes.generated.txt');
const printRoutes = require('express-print-routes');

function initApp({ app, db }) {
  const context = { app, db };

  app.get('/', function(req, res) {
    res.json(app._router.stack);
  });

  app.use('/api', function() {
    registerApps(Router(), context);
  });

  // start API server
  app.server.listen(process.env.PORT || config.port, () => {
    log.info(
      `Server started on:  http://localhost:${app.server.address().port}`
    );
  });

  //printRoutes
  if (process.env.NODE_ENV === 'development') printRoutes(app, filepath);
}

module.exports = initApp;
