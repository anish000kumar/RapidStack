const User = require('./model');
const { crudify } = require('@helpers');

// async function getAll(req, res) {
//   const users = await User.find({});
//   res.send(users);
// }

// async function create(req, res) {
//   const user = await new User(req.body);
//   await user.save();
//   res.send(user);
// }

// async function get(req, res) {
//   const user = await User.findById(req.params.userId);
//   res.send(user);
// }

// async function update(req, res) {
//   const user = await User.updateOne({ id: req.params.userId }, req.body);
//   res.send(user);
// }

// async function destroy(req, res) {
//   await User.deleteOne({ id: req.params.userId });
//   res.send({
//     success: true,
//   });
// }

//public functions
module.exports = {
  ...crudify(User),
  // get,
  // getAll,
  // create,
  // update,
  // destroy,
};
