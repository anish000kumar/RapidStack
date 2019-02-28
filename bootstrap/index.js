const { Router } = require('express');
const registerApps = require('@app');
const config = require('@config');
const log = require('@helpers/log');

function initApp({ app, db }) {
  const context = { app, db };

  // mount api
  const api = Router();
  registerApps(api, context);
  app.use('/api', api);

  // start API server
  app.server.listen(process.env.PORT || config.port, () => {
    log.info(
      `Server started on:  http://localhost:${app.server.address().port}`
    );
  });

  //printRoutes
}

module.exports = initApp;
