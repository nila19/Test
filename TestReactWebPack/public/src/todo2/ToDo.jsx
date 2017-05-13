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

  handleNewToDoChange = (e) => {
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

  handleAll = () => {
    this.props.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter: 'SHOW_ALL'
    });
  };

  handleOpen = () => {
    this.props.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter: 'SHOW_OPEN'
    });
  };

  render() {
    console.log('Render II : ' + this.props.todos.length);
    let filteredTodos = this.props.todos;
    if (this.props.filter === 'SHOW_OPEN') {
      filteredTodos = _.filter(filteredTodos, ['completed', false]);
    }
    return (
      <div className="box">
        <AddForm newTodo={this.state.newTodo} onAdd={this.handleAdd} onNewToDoChange={this.handleNewToDoChange} />
        <ShowWhat onClickAll={this.handleAll} onClickOpen={this.handleOpen} />
        <ToDoList todoList={filteredTodos} onToDoClick={(id) => this.handleToDoClick(id)} />
      </div>
    );
  }
}

export default ToDo;
