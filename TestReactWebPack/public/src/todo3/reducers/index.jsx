import { combineReducers } from 'redux';
import todos from './todos.jsx';
import filter from './filter.jsx';
import seq from './seq.jsx';

const todoReducer = combineReducers({
  todos: todos,
  seq: seq,
  filter: filter
});

export default todoReducer;
