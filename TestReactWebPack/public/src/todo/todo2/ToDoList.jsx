import React from 'react';
import _ from 'lodash';

class ToDoList extends React.Component {
  render() {
    const todos = _.map(this.props.todoList, (todo) => {
      return (
        <li key={todo.id}>
          <div className="field">
            <p className="control">
              <label className="checkbox">
                <input type="checkbox" checked={todo.completed} onChange={() => this.props.onToDoClick(todo.id)} />
                {' '}{todo.desc}
              </label>
            </p>
          </div>


        </li>
      );
    });

    return (
      <div className="pa3">
        <p className="f3">List of todos :</p>
        <ul>{todos}</ul>
      </div>
    );
  }
}

export default ToDoList;
