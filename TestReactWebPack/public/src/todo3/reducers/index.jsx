import { combineReducers } from 'redux';
import todos from './todos.jsx';
import filter from './filter.jsx';

const todoReducer = combineReducers({
  todos: todos,
  filter: filter
});

export default todoReducer;
