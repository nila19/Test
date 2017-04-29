import React from 'react';
import _ from 'lodash';
import SortToggle from './SortToggle.jsx';

class GameInfo extends React.Component {
  render() {
    const step = this.props.history[this.props.currentStep];
    const status = this.props.win ? 'Winner: ' + this.props.win.player : 'Next player: ' + (step.xIsNext ? 'X' : 'O');

    const history = _.orderBy(this.props.history, ['step'], [this.props.sortAsc ? 'asc' : 'desc']);
    const moves = _.map(history, (item) => {
      const desc = item.step ? 'Move #' + item.step : 'Game start';
      return (
        <li key={item.step}>
          <a href="#" className={item.step === this.props.currentStep ? 'b' : ''}
            onClick={() => this.props.jumpTo(item.step)}>{desc}</a>
        </li>
      );
    });

    return (
      <div className="game-info">
        <div>{status}</div>
        <SortToggle sortAsc={this.props.sortAsc} onClick={this.props.handleSort} />
        <ul>{moves}</ul>
      </div>
    );
  }
}

export default GameInfo;
