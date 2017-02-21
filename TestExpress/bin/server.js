'use strict';

const http = require('http');
// monitoring process blockages.
const blocked = require('blocked');

const app = require('./app');
const handler = require('./handler');
const config = require('../api/config/config');

const milliSecsMin = 50;
const port = handler.normalizePort(config.port);
const server = http.createServer(app);

app.set('port', port);
server.listen(port);

// pass-through methods since unable to pass port# from event handler.
server.on('error', function onError(error) {
  handler.onError(error, port, app);
});
server.on('listening', function onListening() {
  handler.onListening(port, app);
});

// pings server every 100ms & look for process blockages. Logs if the wait time goes more than the threshold.
blocked(function blk(ms) {
  app.locals.log.warn(app.locals.log.chalk.cyan(new Date() + ' :: BLOCKED FOR %sms', ms || 0));
}, {threshold: milliSecsMin});

// bad practice to catch the uncaught exception... process.on('uncaughtException', handler.unCaught);
