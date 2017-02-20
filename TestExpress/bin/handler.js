// Coloring console messages.
let chalk = require('chalk');
// Bunyan logger
let log = require('./logger');

function onError(error, port) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      log.error(chalk.magenta(bind + ' requires elevated privileges'));
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log.error(chalk.magenta(bind + ' is already in use'));
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(port) {
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + port;
  log.info('Listening on ' + bind);
}

function unCaught(error) {
  log.error(chalk.magenta('** Uncaught Handler... **'));
  log.error(error.stack);
  log.error(error);
};

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

module.exports = {
  onError: onError,
  onListening: onListening,
  unCaught: unCaught,
  normalizePort: normalizePort,
};
