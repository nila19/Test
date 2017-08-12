import React from 'react';

import VisibleListItems from '../container/VisibleListItems.jsx';
import Refresh from '../container/Refresh.jsx';

const ToDoList = () => (
  <div className="pa3">
    <Refresh />
    <p className="f3">TODO #4 - List of todos : </p>
    <VisibleListItems />
  </div>
);

export default ToDoList;
