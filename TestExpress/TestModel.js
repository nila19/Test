'use strict';

const model = require('./api/models/Model');
const TestModel = function TestModel() {
  // do nothing
};

TestModel.prototype = model('test');

module.exports = function exp() {
  return new TestModel();
};
