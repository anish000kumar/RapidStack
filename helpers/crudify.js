const trycatch = require('./trycatch');

function crudify(Model, name = 'Model') {
  async function createOrFail(data) {
    const result = new Model(data);
    await result.save();
    return result;
  }

  async function getAll() {
    const all = await Model.find({});
    return all;
  }

  async function findOrFail(data) {
    let result = null;
    if (typeof data === 'string') result = await Model.findById(data);
    else result = await Model.find(data);
    if (!result) throw Error(`${name} not found`);
    return result;
  }

  async function updateOrFail(query) {
    return async function(data, upsert) {
      if (typeof query === 'string') {
        query = { _id: query };
      }
      const entity = await Model.findOneAndUpdate(query, data, { upsert });
      return entity;
    };
  }

  async function deleteOrFail(query) {
    if (typeof query === 'string') {
      query = { _id: query };
    }
    const res = await Model.deleteOne(query);
    return res;
  }

  return {
    createOrFail,
    getAll,
    findOrFail,
    updateOrFail,
    deleteOrFail,
  };
}

module.exports = crudify;
