import React from 'react';

import checkWin from './calc.js';
import Board from './Board.jsx';
import GameInfo from './GameInfo.jsx';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        step: 0,
        squares: Array(9).fill(null),
        xIsNext: true,
      }],
      win: null,
      currentStep: 0,
      sortAsc: true
    };
  }
  handleClick(i) {
    const current = this.state.history[this.state.currentStep];
    const squares = current.squares.slice();
    if (!squares[i] && !this.state.win) {
      squares[i] = current.xIsNext ? 'X' : 'O';
      const step = this.state.currentStep + 1;
      const win = checkWin(squares);
      const history = this.state.history.slice(0, step);
      this.setState({
        history: history.concat([{ step: step, squares: squares, xIsNext: !current.xIsNext }]),
        win: win,
        currentStep: step
      });
    }
  }
  jumpTo = (step) => {
    this.setState({ currentStep: step });
  }
  handleSort = () => {
    this.setState({ sortAsc: !this.state.sortAsc });
  }
  render() {
    const step = this.state.history[this.state.currentStep];

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={step.squares} win={this.state.win} onClick={(i) => this.handleClick(i)} />
        </div>
        <GameInfo history={this.state.history} win={this.state.win} currentStep={this.state.currentStep}
          sortAsc={this.state.sortAsc} handleSort={this.handleSort} jumpTo={this.jumpTo} />
      </div>
    );
  }
}

export default Game;
