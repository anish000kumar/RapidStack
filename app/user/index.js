const authenticable = require('../auth');
const User = require('./model');
const userController = require('./controller');
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

app.get('/', userController.getAll);
app.post('/', userController.create);

module.exports = { app, auth };
