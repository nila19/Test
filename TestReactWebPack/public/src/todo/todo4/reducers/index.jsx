import { combineReducers } from 'redux';
import todos from './todos.jsx';
import filter from './filter.jsx';
import seq from './seq.jsx';
import spinner from './spinner.jsx';

const todoReducer = combineReducers({
  todos: todos,
  seq: seq,
  filter: filter,
  spinner: spinner
});

export default todoReducer;
