/* eslint no-console: "off" */

// import React from 'react';
// import ReactDOM from 'react-dom';

// import calculateWin from 'calculate.js';
// const calc = require('calculate.js');

const calculateWin = function (squares) {
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: lines[i] };
    }
  }
  if (_.every(squares, Boolean)) {
    return { player: 'Nobody' };
  }
  return null;
};
const Square = function (props) {
  const cls = props.win ? 'square light-blue' : 'square';
  return React.createElement(
    'button',
    { className: cls, onClick: props.onClick },
    props.value
  );
};

class Board extends React.Component {
  renderSquare(i) {
    const line = this.props.win ? this.props.win.line : [];
    const match = _.includes(line, i);
    return React.createElement(Square, { value: this.props.squares[i], win: match, onClick: () => this.props.onClick(i) });
  }
  renderRow(i) {
    return React.createElement(
      'div',
      { className: 'board-row' },
      this.renderSquare(i * 3 + 0),
      this.renderSquare(i * 3 + 1),
      this.renderSquare(i * 3 + 2)
    );
  }
  render() {
    return React.createElement(
      'div',
      null,
      this.renderRow(0),
      this.renderRow(1),
      this.renderRow(2)
    );
  }
}

class SortToggle extends React.Component {
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'flex items-center mb2' },
        React.createElement('input', { className: 'mr2', type: 'checkbox', defaultChecked: this.props.sortAsc,
          onClick: () => this.props.onClick() }),
        ' Sort Asc ?'
      )
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();

    this.handleSort = () => {
      this.setState({ sortAsc: !this.state.sortAsc });
    };

    this.state = {
      history: [{
        step: 0,
        squares: Array(9).fill(null),
        xIsNext: true
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
      const win = calculateWin(squares);
      const history = this.state.history.slice(0, step);
      this.setState({
        history: history.concat([{ step: step, squares: squares, xIsNext: !current.xIsNext }]),
        win: win,
        currentStep: step
      });
    }
  }
  jumpTo(step) {
    this.setState({ currentStep: step });
  }

  render() {
    const step = this.state.history[this.state.currentStep];
    const status = this.state.win ? 'Winner: ' + this.state.win.player : 'Next player: ' + (step.xIsNext ? 'X' : 'O');

    const history = _.orderBy(this.state.history, ['step'], [this.state.sortAsc ? 'asc' : 'desc']);
    const moves = _.map(history, item => {
      const desc = item.step ? 'Move #' + item.step : 'Game start';
      return React.createElement(
        'li',
        { key: item.step },
        React.createElement(
          'a',
          { href: '#', className: item.step === this.state.currentStep ? 'b' : '',
            onClick: () => this.jumpTo(item.step) },
          desc
        )
      );
    });

    return React.createElement(
      'div',
      { className: 'game' },
      React.createElement(
        'div',
        { className: 'game-board' },
        React.createElement(Board, { squares: step.squares, win: this.state.win, onClick: i => this.handleClick(i) })
      ),
      React.createElement(
        'div',
        { className: 'game-info' },
        React.createElement(
          'div',
          null,
          status
        ),
        React.createElement(SortToggle, { sortAsc: this.state.sortAsc, onClick: this.handleSort }),
        React.createElement(
          'ul',
          null,
          moves
        )
      )
    );
  }
}

// ========================================

ReactDOM.render(React.createElement(Game, null), document.getElementById('root'));