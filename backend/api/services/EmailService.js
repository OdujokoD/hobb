const SparkPost = require('sparkpost');
const sparky = new SparkPost(process.env.EMAIL_AUTH_KEY)

module.exports = {
  sendEmail: function(message, email) {
    sparky.transmissions.send({
        options: {
          endpoint: 'lanre.co'
        },
        content: {
          from: 'damio@lanre.co',
          subject: 'New Hobby',
          html:'<html><body><p>'+ message +'</p></body></html>'
        },
        recipients: [
          {address: email}
        ]
      })
      .then(data => {
        console.log('Email sent!');
        console.log(data);
      })
      .catch(err => {
        console.log('Error sending mail');
        console.log(err);
      });
  }
};
