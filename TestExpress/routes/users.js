let express = require('express');
let router = express.Router();
let log = require('../utils/logger');
let error = require('./error');

router.use(function(req, res, next) {
  log.info('Router >User< invoked... authenticated= ' + res.locals.authenticated);
  res.locals.authenticated = true;
  next();
});

router.all('*', function(req, res, next) {
  log.info('All routes need to go through this...');
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  log.info('Get on >User<... authenticated= ' + res.locals.authenticated);
  res.send('Responding with a resource.. >> ' + req.app.locals.owner + ' :: ' + JSON.stringify(req.app.locals.site));
});

router.use(error.inject404());

module.exports = router;
