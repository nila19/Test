let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/test';

let createContacts = function(db, cb) {
  db.createCollection('contacts', {'validator':
    {'$or': [{'phone': {'$type': 'string'}}, {'email': {'$regex': /@mongodb\.com$/}},
    {'status': {'$in': ['Unknown', 'Incomplete']}}]}}, function(err, r) {
      console.log('Collection created.');
      cb();
    }
  );
};
let insertContacts = function(db, cb) {
  let contacts = db.collection('contacts');
  contacts.insertMany([{name: 'alpha', status: 'Unknown'}, {name: 'beta', status: 'Unknown', phone: '234-234-2344'},
    {name: 'gamma', status: 'Incomplete', email: 'gamma@mongodb.com'},
    {name: 'delta'}, {name: 'theta', phone: '234-234-2344'}], function(err, r) {
      console.log('Inserted ' + r.nInserted + ' documents into the collection.. ');
      // console.log('Inserted ' + r.result.n + ' documents into the collection');
      cb();
    });
};
let findContacts = function(db, parm, cb) {
  let contacts = db.collection('contacts');
  contacts.find(parm).toArray(function(err, docs) {
    console.log(docs);
    cb(docs);
  });
};

let main = function(cb) {
  MongoClient.connect(url, function(err, db) {
    console.log('Connected successfully to server');
    createContacts(db, function() {
      insertContacts(db, function() {
        findContacts(db, {}, function() {
          console.log('Closing db connection');
          db.close();
          cb();
        });
      });
    });
  });
};

let main2 = function(cb) {
  MongoClient.connect(url, function(err, db) {
    findContacts(db, {}, function(docs) {
      db.close();
      cb(docs);
    });
  });
};

module.exports = {
  main: main,
  find: main2,
};
