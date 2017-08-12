import React from 'react';
import _ from 'lodash';

import AddForm from './AddForm.jsx';
import ShowWhat from './ShowWhat.jsx';
import ToDoList from './ToDoList.jsx';

class ToDo extends React.Component {
  constructor() {
    super();
    this.state = {
      viewAll: true,
      todos: [],
      newTodo: '',
      newTodoId: 1
    };
  }

  handleNewToDoChange = (e) => {
    this.setState({
      newTodo: e.target.value
    });
  }

  handleAdd = () => {
    this.setState((prevState) => ({
      todos: [...prevState.todos, {
        id: prevState.newTodoId,
        desc: prevState.newTodo,
        completed: false
      }],
      newTodoId: (prevState.newTodoId + 1),
      newTodo: ''
    }));
  }

  handleToDoClick = (id) => {
    const todos = [...this.state.todos];
    const todo = _.find(todos, ['id', id]);
    todo.completed = !todo.completed;
    this.setState({
      todos: todos
    });
  }

  handleAll = () => {
    this.setState({
      viewAll: true
    });
  };

  handleOpen = () => {
    this.setState({
      viewAll: false
    });
  };

  render() {
    let filteredTodos = this.state.todos;
    if (!this.state.viewAll) {
      filteredTodos = _.filter(this.state.todos, ['completed', false]);
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
