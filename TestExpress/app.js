// Builds path variable.
let path = require('path');
// Serve favicon.
let favicon = require('serve-favicon');
// Request content Parsers.
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
// Compresses the response..
let compression = require('compression');

// Logging framework.
let logger = require('morgan');
// Blocking cross site attacks.
let helmet = require('helmet');

let express = require('express');
let app = express();

let index = require('./routes/index');
let users = require('./routes/users');
let error = require('./routes/error');

// set some application level settings.
app.locals.owner = 'Bala Kuppusamy';
app.locals.site = {
  name: 'TestExpress',
  framework: 'NodeJS',
  db: 'MongoDB',
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// list of middlewares in the order...
app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

// application routes...
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(error.inject404());
app.use(error.handler());

module.exports = app;
