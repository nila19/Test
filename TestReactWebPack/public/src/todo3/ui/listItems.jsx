import React from 'react';

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

const ListItems = ({ todoList, onToDoClick }) => {
  return (
    <ul>{todoList.map(todo =>
      <ListItem key={todo.id} todo={todo} onToDoClick={onToDoClick} />
    )}</ul>
  );
};

export default ListItems;
