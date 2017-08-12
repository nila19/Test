/* eslint require-jsdoc: "off" */

'use strict';

const Model = require('./Model');

class Todo extends Model {
  constructor() {
    super('todo');
  }
}

module.exports = function () {
  return new Todo();
};
