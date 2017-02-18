let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/test';

//* ************************************* SHOPS ***************************************//
// Insert...
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

// Update...
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

// Remove / Delete...
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

// Find...
let findShops = function(db, parm, cb) {
  let shops = db.collection('shops');
  shops.find(parm).toArray(function(err, docs) {
    console.log('Found the following documents...');
    console.log(docs);
    cb();
  });
};

// Index...
let indexShops = function(db, cb) {
  db.collection('shops').createIndex({name: 1}, null, function(err, r) {
    console.log('Created Index... ' + r);
    cb();
  });
};

// main...
let main = function() {
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

//* ************************************* CONTACTS ***************************************//
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
    console.log('Found the following documents...');
    console.log(docs);
    cb();
  });
};
let main2 = function() {
  MongoClient.connect(url, function(err, db) {
    console.log('Connected successfully to server');
    createContacts(db, function() {
      insertContacts(db, function() {
        findContacts(db, {}, function() {
          console.log('Closing db connection');
          db.close();
        });
      });
    });
  });
};

//* ************************************* SCHOOLS ***************************************//
let removeSchools = function(db, cb) {
  let schools = db.collection('schools');
  schools.remove({}, function(err, r) {
    console.log('Removed the documents : ' + r.result.n);
    cb();
  });
};
let bulkSchools = function(db, cb) {
  let bulk = db.collection('schools').initializeOrderedBulkOp();
  for(let i = 0; i < 10; i++) {
    bulk.insert({name: 'WestSide', doors: i * 2, teachers: i * 10});
  }
  for(let j = 0; j < 10; j++) {
    bulk.find({doors: j}).upsert().updateOne({name: 'ShadowBriar', doors: j * 3, parking: 1 * 10});
  }
  bulk.find({teachers: 90}).deleteOne();
  bulk.execute(function(err, r) {
    cb();
  });
};
let findSchools = function(db, parm, cb) {
  let schools = db.collection('schools');
  schools.find(parm, {'name': 1, 'doors': 1, '_id': 0}).sort({name: 1, doors: 1}).each(function(err, doc) {
    console.log(doc);
    // End of iteration...
    if(!doc) {
      cb();
    }
  });
};
let countSchools = function(db, cb) {
  let schools = db.collection('schools');
  console.log('Counting....');
  schools.count({name: 'Bush'}, function(err, i) {
    console.log('Counting.... ' + i);
    cb();
  });
};
let groupSchools = function(db, cb) {
  let schools = db.collection('schools');
  console.log('Grouping....');
  // schools.group(['name'], {doors: {$gt: 12}}, {'total': 0}, 'function (curr, r) {r.total++}', function(err, r) {
  schools.group(['name', 'doors'], {doors: {$lt: 20}}, {'total': 0}, 'function (curr, r) {r.total++}',
    function(err, r) {
      console.log(r);
      cb();
    });
};
let main3 = function() {
  MongoClient.connect(url, function(err, db) {
    console.log('Connected successfully to server');
    removeSchools(db, function() {
    bulkSchools(db, function() {
      findSchools(db, {}, function() {
        countSchools(db, function() {
          groupSchools(db, function() {
            console.log('Closing db connection');
            db.close();
          });
        });
      });
    });
    });
  });
};

// invoke main()...
main();
main2();
main3();
