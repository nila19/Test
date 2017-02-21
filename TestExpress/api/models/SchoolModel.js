'use strict';

const model = require('./Model');
const SchoolModel = function SchoolModel() {
  // do nothing.
};

SchoolModel.prototype = model('schools');
SchoolModel.prototype.findTHRogers = function findTHRogers(db) {
  return db.get(this.collection).find({name: 'THRogers'});
};

module.exports = function exp() {
  return new SchoolModel();
};
