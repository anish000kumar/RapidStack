const mongoose = require('mongoose');
const log = require('@helpers/log');

function mongoProvider() {
  return new Promise((resolve, reject) => {
    try {
      // start connection
      log.info('[mongoDB] Initiaining connection...');
      mongoose.connect(process.env.DB_CONNECTION_STRING);
      const db = mongoose.connection;

      // turn on debug
      if (process.env.DEV) mongoose.set('debug', true);

      // connection error
      db.on('error', function(err) {
        log.error(
          `[mongoDB] Connection failed for: ${
            process.env.DB_CONNECTION_STRING
          } `
        );
        log.error(err);
        reject(err);
      });

      // success
      db.once('open', function() {
        log.success('[mongoDB] Connected to database!');
        resolve(true);
      });
    } catch (err) {
      log.error('[mongoDB]: ' + err);
      reject(err);
    }
  });
}

module.exports = mongoProvider;
