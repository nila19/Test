
import React from 'react';
import ReactDOM from 'react-dom';

// redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import todoReducer from './todo3/reducers/index.jsx';
import AppList from './AppList.jsx';

// ========================================

ReactDOM.render(
  <Provider store={createStore(todoReducer)}>
    <AppList />
  </Provider>,
  document.getElementById('app'));
