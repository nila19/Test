/*jshint -W055 */

var schools = require('./schools');

var http = require('http');
var url = require('url');

var express = require('express');
var app = new express();

var db = null;
require('monk')('localhost:27017/test').then((db1) => {
  db = db1;
  console.log('Connected to database...');
}).catch((err) => {
  console.log(err);
});

app.use(express.static(__dirname + '/public'));
app.get('/coll/:name', function(req, res) {
  var collection = db.get(req.params.name);
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
app.get('/schools/remove/:name', function(req, res) {
  schools.remove(db, {name: req.params.name}).then((result) => {
    res.json(result);
  });
});
app.get('/school/:name', function(req, res) {
  schools.find(db, {name: req.params.name}).then((docs) => {
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
    res.json([{error: 'Error in my update method...'},err]);
  });
});

app.listen(3000);
console.log('Server started & listening @ :3000');
