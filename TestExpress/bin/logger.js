let bunyan = require('bunyan');

let log = bunyan.createLogger({
  name: 'TestExpress',
  streams: [{
    type: 'rotating-file',
    path: 'C:\\Java\\logs\\TestExpress.log',
    period: '1m',    // monthly rotation
    count: 12,       // keep 12 back copies
  }, {
    stream: process.stdout,
  }],
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err,
  },
});

module.exports = log;
