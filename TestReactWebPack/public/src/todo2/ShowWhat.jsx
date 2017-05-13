import React from 'react';

class ShowWhat extends React.Component {
  render() {
    return (
      <div>Show :&nbsp;
        <a className="green no-underline underline-hover" onClick={this.props.onClickAll}>All</a>&nbsp;|&nbsp;
        <a className="green no-underline underline-hover" onClick={this.props.onClickOpen}>Open Only</a>
      </div>
    );
  }
}

export default ShowWhat;
