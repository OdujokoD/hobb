var bcrypt = require('bcrypt')

module.exports = {

  login: function (req, res) {
    var email = req.body.email
    var password = req.body.password

    User.findOne({email: email}).exec(function(error, user){
      if(error){
        return res.json(500, {status: "Error while logging in"})
      }

      if(!user){
        return res.json({status: false, message: "Email address not found"})
      }

      bcrypt.compare(password, user.password, function(error, success){
        if(error){
          return res.json(500, {status: "Error while logging in"})
        }

        if(!success){
          return res.json({status: false, message: "Invalid email amd password combination"})
        }
        
        return res.json({status: true, message: "Email and Password match", id: user.id})
      });
    });
  },

  // logout: function (req, res) {

  //   req.session.destroy();

  //   console.log(req.session)
  //   return res.json({status: 'User successfully logged out'});
  // },

  signup: function (req, res) {
    var username = req.body.username
    var email = req.body.email
    var mobileNumber = req.body.mobileNumber
    var password = req.body.password

    User.create({username: username, email: email, mobileNumber: mobileNumber, password: password }).exec(function(error){
      if(error){
        if(error.invalidAttributes.username){
          return res.json({status: false, message: 'Username already exists'});
        }
        if(error.invalidAttributes.email){
          return res.json({status: false, message: 'Email already exists'});
        }
        if(error.invalidAttributes.mobileNumber){
          return res.json({status: false, message: 'Mobile number already exists'});
        }

        return res.json({status: false, message: 'User could not be created'});
      }else{
        return res.json({status: true, message: 'User successfully created'});
      }
    });
  }
};