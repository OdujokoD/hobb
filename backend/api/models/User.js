var bcrypt = require('bcrypt');

module.exports = {
  connection: 'mongo_db',
  schema: true,
  attributes: {
    username: { 
      type: 'string',
      unique: true 
    },
    email: {
      type: 'string',
      unique: true
    },
    mobileNumber: {
      type: 'string',
      unique: true
    },
    password: {
      type: 'string'
    },
    hobbies: {
      collection: 'hobby',
      via: 'userId'
    }
  },

  beforeCreate: function (values, cb) {

    // Hash password
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return cb(err);
      values.password = hash;
      cb();
    });
  }
};

