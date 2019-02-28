const log = require('./log');
const nodeMailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

function sendEmail(email) {
  //{from, to, subject, text, html}
  const auth = {
    auth: {
      api_key: process.env.MAILGUN_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };
  const nodemailerMailgun = nodeMailer.createTransport(mg(auth));

  return new Promise((resolve, reject) => {
    nodemailerMailgun.sendMail(
      {
        ...email,
        from: process.env.EMAIL_FROM,
      },
      (err, info) => {
        if (err) {
          log.error(`Error: ${JSON.stringify(err)}`);
          reject(err);
        } else {
          log.success(`Response: ${JSON.stringify(info)}`);
          resolve(true);
        }
      }
    );
  });
}

module.exports = sendEmail;
