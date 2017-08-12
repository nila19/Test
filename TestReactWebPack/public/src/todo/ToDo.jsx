import React from 'react';

import ToDo1 from './todo1/ToDo.jsx';
import ToDo2 from './todo2/ToDo.jsx';
import ToDo3 from './todo3/ToDo.jsx';
import ToDo4 from './todo4/ToDo.jsx';

const ToDo = ({ match: { params } }) => {
  switch (params.seq) {
    case '1':
      return <ToDo1 />;
    case '2':
      return <ToDo2 />;
    case '3':
      return <ToDo3 />;
    case '4':
      return <ToDo4 />;
    default:
      return <h1>No matching component...</h1>
  }
};

export default ToDo;
