const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('@config');
const handlebars = require('express-handlebars');

function setGlobalMiddlewares(app) {
  // View engine
  app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
  app.set('view engine', 'handlebars');
  app.use(express.static('public'));

  // Logger middleware
  app.use(morgan('tiny'));

  // CORS middleware
  app.use(
    cors({
      exposedHeaders: config.corsHeaders,
    })
  );

  // for parsing application/json
  app.use(bodyParser.json());

  // for parsing application/xwww-
  app.use(bodyParser.urlencoded({ extended: true }));
  //form-urlencoded
}

module.exports = setGlobalMiddlewares;
