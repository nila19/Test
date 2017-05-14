import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import ListItems from '../ui/listItems.jsx';

const getFilteredTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return _.filter(todos, ['completed', true]);
    case 'SHOW_OPEN':
      return _.filter(todos, ['completed', false]);
    default:
      return todos;
  }
};

const mapStateToProps = (state) => {
  return {
    todoList: getFilteredTodos(state.todos, state.filter)
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onToDoClick: (id) => {
      dispatch({
        type: 'TOGGLE_TODO',
        id: id
      });
    }
  };
};

const VisibleToDoList = connect(mapStateToProps, mapDispatchToProps)(ListItems);

const ToDoList = () => (
  <div className="pa3">
    <p className="f3">List of todos :</p>
    <VisibleToDoList />
  </div>
);

export default ToDoList;
