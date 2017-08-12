'use strict';

const bunyan = require('bunyan');
// coloring console messages.
const chalk = require('chalk');
const config = require('../config/config');

const log = bunyan.createLogger({
  name: 'TestExpress',
  streams: [
    {
      type: 'rotating-file',
      path: config.log.path,
      // monthly rotation
      period: config.log.period,
      // keep 12 back copies
      count: config.log.count
    }, {
      // log to console
      stream: process.stdout
    }
  ],
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err
  }
});

log.chalk = chalk;

module.exports = log;
