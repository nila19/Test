import { connect } from 'react-redux';
import _ from 'lodash';

import ListItems from '../ui/ListItems.jsx';
import { toggleTodo } from '../actions/index.jsx';

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
      dispatch(toggleTodo(id));
    }
  };
};

const VisibleListItems = connect(mapStateToProps, mapDispatchToProps)(ListItems);
export default VisibleListItems;
