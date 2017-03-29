'use strict';

const monk = require('monk');
const config = require('./config');

module.exports = {
  connect: function (next) {
    monk(config.dburl).then((db) => {
      next(db);
    }).catch(() => {
    });
  }
};
