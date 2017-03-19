/* jshint -W055 */

const bodyParser = require('body-parser');
const chalk = require('chalk');
const bunyan = require('bunyan');
const helmet = require('helmet');
const path = require('path');

const express = require('express');
const app = new express();
const server = require('http').createServer(app);

const log = bunyan.createLogger({
  name: 'myapp',
  stream: process.stdout,
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err
  }
});

const port = 3000;

app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

server.listen(port);
log.info('Server started & listening @ port : 3000...');

process.on('uncaughtException', function uce(error) {
  log.error(chalk.magenta('** Uncaught Handler... **'));
  log.error(error.stack);
  log.error(error);
});
