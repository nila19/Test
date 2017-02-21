'use strict';

const monk = require('monk');
const config = require('./config');

module.exports = {
  connect: function connect(app) {
    const log = app.locals.log;

    monk(config.dburl).then((db) => {
      app.locals.db = db;
      log.info('Connected to database...');
    }).catch((err) => {
      log.error(log.chalk.magenta(err));
    });
  }
};
