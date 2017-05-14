import React from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

const ListItem = ({ todo, onToDoClick }) => {
  return (
    <li>
      <div className="field">
        <p className="control">
          <label className="checkbox">
            <input type="checkbox" checked={todo.completed} onChange={() => onToDoClick(todo.id)} />
            {' '}{todo.desc}
          </label>
        </p>
      </div>
    </li>
  );
};

const ToDoListItems = ({ todoList, onToDoClick }) => {
  return (
    <ul>{todoList.map(todo =>
      <ListItem key={todo.id} todo={todo} onToDoClick={onToDoClick} />
    )}</ul>
  );
};

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

const VisibleToDoListItems = connect(mapStateToProps, mapDispatchToProps)(ToDoListItems);

const ToDoList = () => (
  <div className="pa3">
    <p className="f3">List of todos :</p>
    <VisibleToDoListItems />
  </div>
);

export default ToDoList;
