'use strict';

const model = require('../models/Model');
const TestModel = function () {
  // do nothing
};

TestModel.prototype = model('test');

module.exports = function () {
  return new TestModel();
};
