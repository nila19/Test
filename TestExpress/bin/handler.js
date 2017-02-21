/* eslint no-process-exit: "off"*/

'use strict';

const onError = function onError(error, port, app) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = 'Port ' + port;
  const log = app.locals.log;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      log.error(log.chalk.magenta(bind + ' requires elevated privileges'));
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log.error(log.chalk.magenta(bind + ' is already in use'));
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = function onListening(port, app) {
  const bind = 'port ' + port;

  app.locals.log.info('Listening on ' + bind);
};

const unCaught = function unCaught(error, app) {
  const log = app.locals.log;

  log.error(log.chalk.magenta('** Uncaught Handler... **'));
  log.error(error.stack);
  log.error(error);
};

// normalize a port into a number, string, or false.
const normalizePort = function normalizePort(val) {
  const port = parseInt(val, 10);

  // named pipe
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

module.exports = {
  normalizePort: normalizePort,
  onError: onError,
  onListening: onListening,
  unCaught: unCaught
};
