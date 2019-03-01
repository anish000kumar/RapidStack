const User = require('./model');
const crudify = require('@helpers/crudify');
const trycatch = require('@helpers/trycatch');

const userService = crudify(User);

async function getAll(req, res) {
  const users = await userService.getAll();
  res.send(users);
}

async function create(req, res) {
  const user = await userService.createOrFail(req.body);
  res.send(user);
}

async function get(req, res) {
  const user = await userService.findOrFail(req.params.userId);
  res.send(user);
}

async function update(req, res) {
  const user = await userService.updateOrFail(req.params.id)(req.body);
  res.send(user);
}

async function destroy(req, res) {
  await User.deleteOrFail(req.params.userId);
  res.send(true);
}

//public functions
module.exports = trycatch({
  get,
  getAll,
  create,
  update,
  destroy,
});
