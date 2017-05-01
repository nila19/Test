
import React from 'react';
import ReactDOM from 'react-dom';

import Game from './tictactoe/Game.jsx';
import FilterableList from './filter/FilterableList.jsx';

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
    }
    return false;
  }

  render() {
    return (
      <ul>
        <li><a href="#" onClick={() => this.goTo('TicTacToe')}>TicTacToe</a></li>
        <li><a href="#" onClick={() => this.goTo('Filter')}>Filter</a></li>
      </ul>
    );
  }
}

export default AppList;
