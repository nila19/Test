let find = function(db, filter) {
  let options = {fields: {'name': 1, 'doors': 1, '_id': 0}, sort: {name: 1, doors: 1}, limit: 200};
  return db.get('schools').find(filter, options);
};

let findAll = function(db) {
  return find(db, {});
};

let distinct = function(db, filter) {
  let options = {sort: {name: 1}, limit: 200};
  return db.get('schools').distinct('name', filter, options);
};

let remove = function(db, filter) {
  return db.get('schools').remove(filter);
};

let removeAll = function(db) {
  return remove(db, {});
};

let insert = function(db, data) {
  return db.get('schools').insert(data);
};

let update = function(db, filter, mod) {
  let options = {multi: true, upsert: true};
  return db.get('schools').update(filter, mod, options);
};

module.exports = {
  findAll: findAll,
  find: find,
  distinct: distinct,
  removeAll: removeAll,
  remove: remove,
  insert: insert,
  update: update,
};
