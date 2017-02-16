var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/test';

var insertShops = function(db, cb) {
  var shops = db.collection('shops');
  shops.insertMany([{name: 'Kroger', doors: 1}, {name: 'Walmart', doors: 2}, {name: 'Costco', doors: 3}],
    function(err, r) {
      console.log('Inserted ' + r.insertedCount + ' documents into the collection');
      cb();
    });
};
var insertShop = function(db, cb) {
  var shops = db.collection('shops');
  shops.insertOne({name: 'Sysco', doors: 12}, function(err, r) {
      console.log('Inserted ' + r.insertedCount + ' documents into the collection');
      cb();
    });
};

var updateShops = function(db, cb) {
  var shops = db.collection('shops');
  shops.updateMany({name: 'Walmart'}, {$set: {doors: 8, security: 2}}, function(err, r) {
    console.log('Updated the documents : ' + r.result.n);
    cb();
  });
};
var updateShop = function(db, cb) {
  var shops = db.collection('shops');
  shops.updateOne({name: 'Costco'}, {$set: {doors: 4, security: 2}}, function(err, r) {
    console.log('Updated the documents : ' + r.result.n);
    cb();
  });
};

var removeShops = function(db, cb) {
  var shops = db.collection('shops');
  shops.remove({name: 'Walmart'}, function(err, r) {
    console.log('Removed the documents : ' + r.result.n);
    cb();
  });
};
var deleteShops = function(db, cb) {
  var shops = db.collection('shops');
  shops.deleteMany({name: 'Kroger'}, function(err, r) {
    console.log('Deleted the documents : ' + r.result.n);
    cb();
  });
};
var deleteShop = function(db, cb) {
  var shops = db.collection('shops');
  shops.deleteOne({name: 'Costco'}, function(err, r) {
    console.log('Deleted the documents : ' + r.result.n);
    cb();
  });
};

var findShops = function(db, parm, cb) {
  var shops = db.collection('shops');
  shops.find(parm).toArray(function(err, docs) {
    console.log(docs);
    cb(docs);
  });
};

var indexShops = function(db, cb) {
  db.collection('shops').createIndex({name: 1}, null, function(err, r) {
    console.log('Created Index... ' + r);
    cb();
  });
};

var main = function(cb) {
  MongoClient.connect(url, function(err, db) {
    console.log('Connected successfully to server');
    insertShop(db, function() {
      insertShops(db, function() {
        updateShops(db, function() {
          updateShop(db, function() {
            indexShops(db, function() {
              findShops(db, {name: 'Walmart'}, function() {
                removeShops(db, function() {
                  deleteShops(db, function() {
                    deleteShop(db, function() {
                      findShops(db, {name: 'Sysco'}, function() {
                        console.log('Closing db connection');
                        db.close();
                        cb();
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};

var main2 = function(cb) {
  MongoClient.connect(url, function(err, db) {
    findShops(db, {name: 'Sysco'}, function(docs) {
      db.close();
      cb(docs);
    });
  });
};

module.exports = {
  main: main,
  find: main2
};
