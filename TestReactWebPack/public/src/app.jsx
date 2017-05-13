
import React from 'react';
import ReactDOM from 'react-dom';

import AppList from './AppList.jsx';

// redux
import { createStore } from 'redux';
import todoReducer from './todo2/reducers/index.jsx';
const store = createStore(todoReducer);
// ========================================

const render = () => {
  console.log('Render 0 : ' + store.getState().todos.length);
  ReactDOM.render(<AppList state={store.getState()} dispatch={(ac) => store.dispatch(ac)} />,
    document.getElementById('app'));
};
store.subscribe(render);
render();
