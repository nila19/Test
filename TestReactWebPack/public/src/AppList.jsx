
import React from 'react';
import ReactDOM from 'react-dom';

import Game from './tictactoe/Game.jsx';
import FilterableList from './filter/FilterableList.jsx';
import RouterTest from './router/RouterTest.jsx';

// ========================================

class AppList extends React.Component {
  goTo(app) {
    switch (app) {
      case 'TicTacToe':
        ReactDOM.render(<Game />, document.getElementById('app'));
        break;
      case 'Filter':
        ReactDOM.render(<FilterableList />, document.getElementById('app'));
        break;
      case 'Router':
        ReactDOM.render(<RouterTest />, document.getElementById('app'));
        break;
    }
    return false;
  }

  render() {
    return (
      <ul className="menu-list">
        <li><a href="#" onClick={() => this.goTo('TicTacToe')}>TicTacToe ok</a></li>
        <li><a href="#" onClick={() => this.goTo('Filter')}>Item Filter</a></li>
        <li><a href="#" onClick={() => this.goTo('Router')}>Router</a></li>
      </ul>
    );
  }
}

export default AppList;
