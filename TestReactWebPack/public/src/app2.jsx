
import React from 'react';
import ReactDOM from 'react-dom';

import ToDo2 from './todo2/ToDo.jsx';

import { createStore } from 'redux';
import todoReducer from './todo2/reducers/index.jsx';
const store = createStore(todoReducer);

const dispatch = (action) => {
  store.dispatch(action);
};

class AppList2 extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log('Render I : ' + this.props.state.todos.length);
    return (
      <div className="columns mh5 ph5 pv5">
        <div className="column is-3">
          <aside className="menu">
            <ul className="menu-list">
              <li>
                <a href="http://localhost:8080/public/dist/app.html">
                  <span className="icon is-large">
                    <i className="fa fa-home"></i>
                  </span>
                </a>
              </li>
            </ul>
          </aside>
        </div>
        <div className="column is-7">
          <div>
            <ToDo2 todos={this.props.state.todos} filter={this.props.state.filter} dispatch={dispatch} />
          </div>
        </div>
        <div className="column is-2">&nbsp;</div>
      </div>
    );
  }
}

// ========================================

const renderApp = () => {
  ReactDOM.render(
    <AppList2 state={store.getState()} />,
    document.getElementById('app'));
};
store.subscribe(renderApp);
renderApp();
