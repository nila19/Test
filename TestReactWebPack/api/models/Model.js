/* eslint require-jsdoc: "off" */

'use strict';

class Model {
  constructor(collection) {
    this.collection = collection;
  }
  findById(db, id) {
    return db.get(this.collection).findOne({ id: id }, { fields: { _id: 0 } });
  }
  findOne(db, filter, options) {
    return db.get(this.collection).findOne(filter, options || {});
  }
  find(db, filter, options) {
    return db.get(this.collection).find(filter, options || {});
  }
  findAll(db, options) {
    return this.find(db, {}, options);
  }
  remove(db, filter) {
    return db.get(this.collection).remove(filter);
  }
  removeAll(db) {
    return this.remove(db, {});
  }
  insert(db, data) {
    return db.get(this.collection).insert(data);
  }
  update(db, filter, mod, options) {
    let opt = { multi: true, upsert: true };

    // embed the multi/upsert options based on input options.
    opt = options ? Object.assign({}, opt, options) : opt;
    return db.get(this.collection).update(filter, mod, opt);
  }
}

module.exports = Model;
