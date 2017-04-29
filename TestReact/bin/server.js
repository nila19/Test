'use strict';

const http = require('http');

const app = require('./app');
const server = http.createServer(app);
const port = 3300;

app.set('port', port);
server.listen(port);
// console.log('Server started...');
