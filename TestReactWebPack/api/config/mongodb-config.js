'use strict';

const monk = require('monk');
const config = require('./config');

const ping = function (log, next) {
  monk(config.dburl).then((db) => {
    log.info('Connected to :: ' + config.dburl);
    next(null, db);
  }).catch((err) => {
    log.error(log.chalk.magenta(err));
    next(err);
  });
};

const connect = function (app) {
  ping(app.locals.log, function (err, db) {
    // if connection error, print next connect msg.
    if (!err) {
      app.locals.db = db;
    }
  });
};

module.exports = {
  connect: connect,
};
