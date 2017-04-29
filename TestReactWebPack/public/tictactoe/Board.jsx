import React from 'react';
import Square from './Square.jsx';
import _ from 'lodash';

class Board extends React.Component {
  renderSquare(i) {
    const line = this.props.win ? this.props.win.line : [];
    const match = _.includes(line, i);
    return <Square value={this.props.squares[i]} win={match} onClick={() => this.props.onClick(i)} />;
  }
  renderRow(i) {
    return (
      <div className="board-row">
        {this.renderSquare((i * 3) + 0)}
        {this.renderSquare((i * 3) + 1)}
        {this.renderSquare((i * 3) + 2)}
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.renderRow(0)}
        {this.renderRow(1)}
        {this.renderRow(2)}
      </div>
    );
  }
}

export default Board;
