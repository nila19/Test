
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducer from './todo/todo4/reducers/index.jsx';
import AppList from './AppList.jsx';

// ========================================
const logger = createLogger();
const middleware = [thunk, logger];

ReactDOM.render(
  <Provider store={createStore(reducer, applyMiddleware(...middleware))}>
    <AppList />
  </Provider>,
  document.getElementById('app'));
