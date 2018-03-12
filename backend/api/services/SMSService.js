var client = require('twilio')(process.env.SMS_ACCOUNT_SID, process.env.SMS_AUTH_KEY);

module.exports = {
  sendSMS: function(message, mobileNumber) {
    client.messages.create({
        body: message,
        to: mobileNumber,
        from: process.env.TWILIO_NUMBER
      }).then((message) => console.log(message.sid));
  }
};
