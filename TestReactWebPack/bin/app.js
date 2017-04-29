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

// list of middlewares in the order...
app.use(helmet());
app.use(compression());
app.use(morgan('dev', {
  skip: function (req, res) {
    return res.statusCode < httpSuccess;
  }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(favicon(path.join(__dirname, '../public/images', 'favicon.ico')));

module.exports = app;
