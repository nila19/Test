'use strict';

const todo = require('../routes/todo-route');

module.exports = {
  route: function (app) {
    app.use('/todo', todo);
  }
};
