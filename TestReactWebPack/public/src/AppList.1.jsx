
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Game from './tictactoe/Game.jsx';
import FilterableList from './filter/FilterableList.jsx';
import RouterTest from './router/RouterTest.jsx';
import ToDo from './todo/ToDo.jsx';
import ToDo2 from './todo2/ToDo.jsx';

// ========================================

class AppList extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log('Render I : ' + this.props.state.todos.length);
    return (
      <Router>
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
                <li><Link to="/">Home</Link></li>
                <li><Link to="/tictactoe">TicTacToe</Link></li>
                <li><Link to="/productfilter">Product Filter</Link></li>
                <li><Link to="/router">Router</Link></li>
                <li><Link to="/todo">ToDo</Link></li>
                <li><Link to="/todo2">ToDo2</Link></li>
              </ul>
            </aside>
          </div>
          <div className="column is-7">
            <div>
              <Route exact path="/" render={() => (
                <div className="f3">Welcome</div>
              )} />
              <Route path="/tictactoe" component={Game} />
              <Route path="/productfilter" component={FilterableList} />
              <Route path="/router" component={RouterTest} />
              <Route path="/todo" component={ToDo} />
              <Route path="/todo2" render={() => (
                <ToDo2 {...this.props.state} dispatch={this.props.dispatch} />
              )} />
            </div>
          </div>
          <div className="column is-2">&nbsp;</div>
        </div>
      </Router>
    );
  }
}

export default AppList;
