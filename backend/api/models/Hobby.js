module.exports = {

  connection: 'mongo_db',
  schema: true,
  attributes: {
    name: {
      type: 'string'
    },
    userId: {
      model: 'user'
    }
  }
};