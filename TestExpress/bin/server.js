let http = require('http');
// Monitoring process blockages.
let blocked = require('blocked');
// Coloring console messages.
let chalk = require('chalk');

let app = require('../app');
let handler = require('./handler');
// Configures Bunyan logger
let log = require('./logger');

let port = handler.normalizePort(process.env.PORT || '3000');
app.set('port', port);
let server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Pings server every 100ms & look for process blockages. Logs if the wait time goes more than the threshold.
blocked(function(ms) {
  log.warn(chalk.cyan(new Date() + ' :: BLOCKED FOR %sms', ms || 0));
}, {threshold: 50});

// bad practice to catch the uncaught exception... process.on('uncaughtException', handler.unCaught); Pass-through
// methods since unable to pass port# from event handler.
function onError(error) {
  handler.onError(error, port);
}
function onListening() {
  handler.onListening(port);
}
