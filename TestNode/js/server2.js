/* jshint -W055 */

let schools = require('./schools2');

// let url = require('url');
// let connect = require('connect');
let bodyParser = require('body-parser');
let emptygif = require('emptygif');
let blocked = require('blocked');
let chalk = require('chalk');
let bunyan = require('bunyan');
let helmet = require('helmet');

require('look').start();

let express = require('express');
let app = new express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

let log = bunyan.createLogger({
  name: 'myapp',
  streams: [{
    type: 'rotating-file',
    path: 'C:\\Java\\logs\\foo.log',
    period: '1m',    // daily rotation
    count: 12,       // keep 12 back copies
  }, {
    stream: process.stdout,
  }],
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err,
  },
});

let db = null;
require('monk')('localhost:27017/test').then((db1) => {
  db = db1;
  log.info('Connected to database...');
}).catch((err) => {
  log.error(err);
});

app.use(helmet());
app.use(express.static(__dirname + '/public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// sockets.io handler...
app.get('/tpx.gif', function(req, res, next) {
  io.emit('visit', {
    ip: req.ip,
    ua: req.headers['user-agent'],
  });
  emptygif.sendEmptyGif(req, res, {
    'Content-Type': 'image/gif',
    'Content-Length': emptygif.emptyGifBufferLength,
    'Cache-Control': 'public, max-age=0', // or specify expiry to make sure it will call everytime
  });
});

app.get('/collection/:name', function(req, res) {
  let collection = db.get(req.params.name);
  collection.find({}, {limit: 200}, function(e, docs) {
    res.json(docs);
  });
});
app.get('/schools', function(req, res) {
  schools.findAll(db).then((docs) => {
    res.json(docs);
  });
});
app.get('/schools/distinct', function(req, res) {
  schools.distinct(db, {doors: 12}).then((docs) => {
    res.json(docs);
  });
});
app.get('/schools/remove', function(req, res) {
  schools.remove(db, {name: req.query.name}).then((result) => {
    res.json(result);
  });
});
app.get('/school', function(req, res) {
  schools.find(db, {name: req.query.name}).then((docs) => {
    res.json(docs);
  });
});
app.get('/schools/add', function(req, res) {
  schools.insert(db, {name: 'OakForest', doors: 10}).then((docs) => {
    schools.insert(db, [{name: 'OakRidge', doors: 11}, {name: 'OakRidge', doors: 12}]).then((docs2) => {
      res.json([docs, docs2]);
    });
  });
});
app.get('/schools/update', function(req, res) {
  schools.update(db, {name: 'OakRidge'}, {$set: {name: 'OakBridge', doors: 21, windows: 42}}).then((docs) => {
    res.json(docs);
  }).catch((err) => {
    res.json([{error: 'Error in my update method...'}, err]);
  });
});
app.post('/schools/add', function(req, res) {
  schools.insert(db, {name: req.body.name, doors: req.body.doors}).then((doc) => {
    schools.find(db, {_id: doc._id}).then((docs) => {
      res.json(docs);
    });
  });
});

// setInterval(function() {
//   Array(10000000).join('a');
// }, 1000);

blocked(function(ms) {
  log.warn(chalk.cyan(new Date() + ' :: BLOCKED FOR %sms', ms || 0));
}, {threshold: 50});

// app.listen(3000);
server.listen(3000);
log.info('Server started & listening @ port : 3000...');

process.on('uncaughtException', function(error) {
  log.error(chalk.magenta('** Uncaught Handler... **'));
  log.error(error.stack);
  log.error(error);
});
