/* eslint prefer-const: "off" */

'use strict';

const todo = require('../models/Todo.js')();
const errcode = 1000;

module.exports = {
  getAllTodos: function (req, resp) {
    let result = {
      code: errcode,
      message: 'Fetch failed...'
    };

    req.app.locals.log.info('Trying to getAll..');
    todo.findAll(req.app.locals.db).then((data) => {
      if (data) {
        result.code = 0;
        result.message = 'Fetch successful';
        result.data = data;
      }
      resp.json(result);
    }).catch((err) => {
      req.app.locals.log.error(err);
      resp.json(result);
    });
  },
  addTodo: function (req, resp) {
    let result = {
      code: errcode,
      message: 'Add failed...'
    };

    req.app.locals.log.info('Trying to add.. ' + JSON.stringify(req.body));
    const todoObj = {
      id: req.body.id,
      desc: req.body.desc,
      completed: req.body.completed
    };
    todo.insert(req.app.locals.db, todoObj).then((ok) => {
      if (ok) {
        result.code = 0;
        result.message = 'Add successful';
      }
      resp.json(result);
    }).catch((err) => {
      req.app.locals.log.error(err);
      resp.json(result);
    });
  },
  updateTodo: function (req, resp) {
    let result = {
      code: errcode,
      message: 'Complete failed...'
    };

    req.app.locals.log.info('Trying to complete.. ' + JSON.stringify(req.body));
    todo.update(req.app.locals.db, { id: req.body.id }, { $set: { completed: req.body.completed } }).then((ok) => {
      if (ok) {
        result.code = 0;
        result.message = 'Update successful';
      }
      resp.json(result);
    }).catch((err) => {
      req.app.locals.log.error(err);
      resp.json(result);
    });
  }
};
