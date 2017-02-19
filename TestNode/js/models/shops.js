let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/test';

let insertShops = function(db, cb) {
  let shops = db.collection('shops');
  shops.insertMany([{name: 'Kroger', doors: 1}, {name: 'Walmart', doors: 2}, {name: 'Costco', doors: 3}],
    function(err, r) {
      console.log('Inserted ' + r.insertedCount + ' documents into the collection');
      cb();
    });
};
let insertShop = function(db, cb) {
  let shops = db.collection('shops');
  shops.insertOne({name: 'Sysco', doors: 12}, function(err, r) {
      console.log('Inserted ' + r.insertedCount + ' documents into the collection');
      cb();
    });
};

let updateShops = function(db, cb) {
  let shops = db.collection('shops');
  shops.updateMany({name: 'Walmart'}, {$set: {doors: 8, security: 2}}, function(err, r) {
    console.log('Updated the documents : ' + r.result.n);
    cb();
  });
};
let updateShop = function(db, cb) {
  let shops = db.collection('shops');
  shops.updateOne({name: 'Costco'}, {$set: {doors: 4, security: 2}}, function(err, r) {
    console.log('Updated the documents : ' + r.result.n);
    cb();
  });
};

let removeShops = function(db, cb) {
  let shops = db.collection('shops');
  shops.remove({name: 'Walmart'}, function(err, r) {
    console.log('Removed the documents : ' + r.result.n);
    cb();
  });
};
let deleteShops = function(db, cb) {
  let shops = db.collection('shops');
  shops.deleteMany({name: 'Kroger'}, function(err, r) {
    console.log('Deleted the documents : ' + r.result.n);
    cb();
  });
};
let deleteShop = function(db, cb) {
  let shops = db.collection('shops');
  shops.deleteOne({name: 'Costco'}, function(err, r) {
    console.log('Deleted the documents : ' + r.result.n);
    cb();
  });
};

let findShops = function(db, parm, cb) {
  let shops = db.collection('shops');
  shops.find(parm).toArray(function(err, docs) {
    console.log(docs);
    cb(docs);
  });
};

let indexShops = function(db, cb) {
  db.collection('shops').createIndex({name: 1}, null, function(err, r) {
    console.log('Created Index... ' + r);
    cb();
  });
};

let main = function(cb) {
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

let main2 = function(cb) {
  MongoClient.connect(url, function(err, db) {
    findShops(db, {name: 'Sysco'}, function(docs) {
      db.close();
      cb(docs);
    });
  });
};

module.exports = {
  main: main,
  find: main2,
};
