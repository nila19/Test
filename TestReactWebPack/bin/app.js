'use strict';

// builds path variable.
const path = require('path');
// serve favicon.
const favicon = require('serve-favicon');
// request content Parsers.
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// compresses the response..
const compression = require('compression');
// 'HTTP request' logging framework.
const morgan = require('morgan');
// blocking cross site attacks.
const helmet = require('helmet');
const express = require('express');

const app = express();

const httpSuccess = 400;  // less than 400 are success codes.

// store logger in app context for use from other components.
app.locals.log = require('../api/utils/logger');

// route config..
const routes = require('../api/config/route-config');

// establish DB connection to MongoDB..
require('../api/config/mongodb-config').connect(app);

// list of middlewares in the order...
app.use(helmet());
app.use(compression());
app.use(morgan('dev', {
  skip: function (req, res) {
    return res.statusCode < httpSuccess;
  }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(favicon(path.join(__dirname, '../public/images', 'favicon.ico')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

routes.route(app);
// route fallback
app.get('/*', (req, res) => {
  res.sendfile(path.join(__dirname, '../public/src/app.html'))
});

module.exports = app;
