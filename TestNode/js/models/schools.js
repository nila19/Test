var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/test';

var removeSchools = function(db, cb) {
  var schools = db.collection('schools');
  schools.remove({}, function(err, r) {
    console.log('Removed the documents : ' + r.result.n);
    cb();
  });
};
var bulkSchools = function(db, cb) {
  var bulk = db.collection('schools').initializeOrderedBulkOp();
  for(var i = 0; i < 10; i++) {
    bulk.insert({name: 'Bush', doors: i * 2, teachers: i * 10});
  }
  for(var j = 0; j < 10; j++) {
    bulk.find({doors: j}).upsert().updateOne({name: 'THRogers', doors: j * 3, parking: 1 * 10});
  }
  bulk.find({teachers: 90}).deleteOne();
  bulk.execute(function(err, r) {
    cb();
  });
};
var findSchools = function(db, parm, cb) {
  var schools = db.collection('schools');
  schools.find(parm, {name: 1, doors: 1, '_id': 0}).sort({name: 1, doors: 1}).each(function(err, doc) {
    if(!doc) {
      cb();
    } else {
      console.log(doc);
    }
  });
};
var countSchools = function(db, cb) {
  var schools = db.collection('schools');
  schools.count({name: 'Bush'}, function(err, i) {
    console.log('Counted.... ' + i);
    cb({count: i});
  });
};
var groupSchools = function(db, cb) {
  var schools = db.collection('schools');
  console.log('Grouping....');
  // schools.group(['name'], {doors: {$gt: 12}}, {'total': 0}, 'function (curr, r) {r.total++}', function(err, r) {
  schools.group(['name', 'doors'], {doors: {$lt: 20}}, {'total': 0}, 'function (curr, r) {r.total++}',
    function(err, r) {
      console.log(r);
      cb();
    });
};

var main = function(cb) {
  MongoClient.connect(url, function(err, db) {
    console.log('Connected successfully to server');
    // removeSchools(db, function() {
    bulkSchools(db, function() {
      findSchools(db, {}, function() {
        countSchools(db, function() {
          groupSchools(db, function() {
            console.log('Closing db connection');
            db.close();
            cb();
          });
        });
      });
    });
    // });
  });
};

var main2 = function(cb) {
  MongoClient.connect(url, function(err, db) {
    countSchools(db, function(doc) {
      db.close();
      cb(doc);
    });
  });
};

module.exports = {
  main: main,
  find: main2
};
