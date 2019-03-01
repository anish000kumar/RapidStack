const Twilio = require('twilio');
const log = require('./log');

function sendMessage(data) {
  return new Promise((resolve, reject) => {
    const accountSid = process.env.TWILIO_SID;
    console.log('>>>', accountSid);
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new Twilio(accountSid, authToken);

    client.messages
      .create(data)
      .then(message => {
        log.success(message);
        resolve(1);
      })
      .catch(err => {
        log.error(err);
        reject(err);
      })
      .done();
  });
}

module.exports = sendMessage;
