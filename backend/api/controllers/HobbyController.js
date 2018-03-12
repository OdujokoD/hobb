module.exports = {

  create: function(req, res) {
    var name = req.body.name;
    var userId = req.params.userId;
    var message = "You created a new hobby: " + name

    User.findOne({ id: userId }).exec(function(error, user) {
      if (error) {
        return res.json(500, { status: false, message: "Hobby could not be created" });
      }
      if(!user){
        return res.json({status: false, message: "User does not exist", user: {}})
      }

      Hobby.create({ name: name, userId: userId }).exec(function(error, newHobby) {
        if (error) {
          return res.json(500, { status: "Hobby could not be created" });
        }
        SMSService.sendSMS(message, user.mobileNumber)
        EmailService.sendEmail(message, user.email)

        return res.json({status: true, message: "", hobby: newHobby });
      });
    });

  },

  fetch: function(req, res) {
    var userId = req.params.userId;

    Hobby.find({ userId: userId }).exec(function(error, hobbies) {
      if (error) {
        return res.json(500, { status:false, message: "Could not fetch hobbies" });
      }
      return res.json({status: true, message: "", hobbies: hobbies });
    });
  },

  update: function(req, res) {
    var name = req.body.name;
    var id = req.params.id;

    Hobby.update({ id: id }, { name: name }).exec(function(error) {
      if (error) {
        return res.json(500, { status:false, message: "Hobby could not be updated" });
      }
      return res.json({ status: true, message: "Hobby successfully updated" });
    });
  },

  delete: function(req, res) {
    var id = req.params.id;

    Hobby.destroy({ id: id }).exec(function(error) {
      if (error) {
        return res.json(500, { status:false, message: "Hobby could not be deleted" });
      }
      return res.json({ status:true, message: "Hobby successfully deleted" });
    });
  }
};