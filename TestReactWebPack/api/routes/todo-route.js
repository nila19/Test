'use strict';

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/TodoController.js');

router.get('/all', function (req, res, next) {
  const DELAY = 3000;

  setTimeout(() => {
    ctrl.getAllTodos(req, res);
  }, DELAY);
});

router.post('/add', function (req, res, next) {
  ctrl.addTodo(req, res);
});

router.post('/update', function (req, res, next) {
  ctrl.updateTodo(req, res);
});

module.exports = router;
