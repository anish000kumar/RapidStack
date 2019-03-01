const log = require('@helpers/log');
const nodeMailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const config = require('@config/mail');

function sendMail(mailData) {
  const {
    to,
    subject = `Mail from ${config.companyName}`,
    template = 'default',
    data = {},
  } = mailData;
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
        to,
        from: config.from,
        subject,
        html: require(`./templates/${template}`)(data),
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

function mailable({ schema, emailField = 'email' }) {
  schema.methods.mail = function mail(metaData = {}) {
    const self = this;
    return function(data = {}) {
      const {
        subject = `Mail from ${config.companyName}`,
        template = 'default',
      } = metaData;

      return sendMail({
        to: self[emailField],
        subject,
        template,
        data,
      });
    };
  };
}

module.exports = { sendMail, mailable };
