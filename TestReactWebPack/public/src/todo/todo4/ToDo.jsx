import React from 'react';

import AddForm from './container/AddForm.jsx';
import Filters from './ui/Filters.jsx';
import ToDoList from './ui/ToDoList.jsx';

const ToDo = () => (
  <div className="box">
    <AddForm />
    <Filters />
    <ToDoList />
  </div>
);

export default ToDo;
