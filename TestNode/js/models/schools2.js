var find = function(db, filter) {
  var options = {fields: {name: 1, doors: 1, '_id': 0}, sort: {name: 1, doors: 1}, limit: 200};
  return db.get('schools').find(filter, options);
};

var findAll = function(db) {
  return find(db, {});
};

var distinct = function(db, filter) {
  var options = {sort: {name: 1}, limit: 200};
  return db.get('schools').distinct('name', filter, options);
};

var remove = function(db, filter) {
  return db.get('schools').remove(filter);
};

var removeAll = function(db) {
  return remove(db, {});
};

var insert = function(db, data) {
  return db.get('schools').insert(data);
};

var update = function(db, filter, mod) {
  var options = {multi: true, upsert: true};
  return db.get('schools').update(filter, mod, options);
};

module.exports = {
  findAll: findAll,
  find: find,
  distinct: distinct,
  remove: remove,
  insert: insert,
  update: update
};
