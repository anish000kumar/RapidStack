require('dotenv').config();
const http = require('http');
const express = require('express');
const initializeDb = require('@database');
const setGlobalMiddlewares = require('@bootstrap/globalMiddlewares');
const log = require('@helpers/log');
const initializeApp = require('@bootstrap');

// setup express app
let app = express();
app.server = http.createServer(app);

// global middleware
setGlobalMiddlewares(app);

// connect to db
initializeDb()
  .then(db => initializeApp({ app, db }))
  .catch(err => log.error('[error] initApp: ' + err));

module.exports = app;
