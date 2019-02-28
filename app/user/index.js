const authenticable = require('../auth');
const User = require('./model');
const { Router } = require('express');

const app = Router();

const auth = authenticable({
  router: app,
  model: User,
  fields: {
    hash: 'resetPasswordHash',
    username: ['email', 'username'],
  },
});

module.exports = { app, auth };
