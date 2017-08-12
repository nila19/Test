import React from 'react';
import _ from 'lodash';

import AddForm from './AddForm.jsx';
import ShowWhat from './ShowWhat.jsx';
import ToDoList from './ToDoList.jsx';

class ToDo extends React.Component {
  constructor() {
    super();
    this.state = {
      newTodo: '',
      newTodoId: 0
    };
  }

  handleNewChange = (e) => {
    this.setState({
      newTodo: e.target.value
    });
  }

  handleAdd = () => {
    this.props.dispatch({
      type: 'ADD_TODO',
      id: this.state.newTodoId + 1,
      desc: this.state.newTodo
    });
    this.setState({
      newTodo: '',
      newTodoId: this.state.newTodoId + 1
    });
  }

  handleToDoClick = (id) => {
    this.props.dispatch({
      type: 'TOGGLE_TODO',
      id: id
    });
  }

  handleFilter = (f) => {
    this.props.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter: f
    });
  };

  getFilteredTodos = (todos, filter) => {
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

  render() {
    const { todos, filter } = this.props;
    console.log('Render II : ' + todos.length);
    const filteredTodos = this.getFilteredTodos(todos, filter);
    return (
      <div className="box">
        <AddForm newTodo={this.state.newTodo} onAdd={this.handleAdd} onNewChange={this.handleNewChange} />
        <ShowWhat onClick={(f) => this.handleFilter(f)} filter={filter} />
        <ToDoList todoList={filteredTodos} onToDoClick={(id) => this.handleToDoClick(id)} />
      </div>
    );
  }
}

export default ToDo;
