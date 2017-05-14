import React from 'react';

import AddForm from './AddForm.jsx';
import ShowWhat from './ShowWhat.jsx';
import ToDoList from './ToDoList.jsx';

const ToDo = () => (
  <div className="box">
    <AddForm />
    <ShowWhat />
    <ToDoList />
  </div>
);

export default ToDo;
