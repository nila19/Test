'use strict';

const Model = function Model(coll) {
  this.collection = coll;
};

Model.prototype = {
  findOne: function findOne(db, filter, options) {
    return db.get(this.collection).findOne(filter, options || {});
  },
  find: function find(db, filter, options) {
    return db.get(this.collection).find(filter, options || {});
  },
  findAll: function findAll(db, options) {
    return this.find(db, {}, options);
  },
  remove: function remove(db, filter) {
    return db.get(this.collection).remove(filter);
  },
  removeAll: function removeAll(db) {
    return this.remove(db, {});
  },
  insert: function insert(db, data) {
    return db.get(this.collection).insert(data);
  },
  update: function update(db, filter, mod, options) {
    return db.get(this.collection).update(filter, mod, options || {
      multi: true,
      upsert: true
    });
  }
};

module.exports = function exp(coll) {
  return new Model(coll);
};
