import React from 'react';

class SearchBar extends React.Component {
  render() {
    return (
      <div className="box">
        <div className="field">
          <p className="control">
            <input className="input" type="text" placeholder="Text input" value={this.props.query}
              onChange={this.props.onQueryChange} />
          </p>
        </div>
        <div className="field">
          <p className="control">
            <label className="checkbox">
              <input type="checkbox" checked={this.props.stocksOnly} onChange={this.props.onStockChange} />
              {' '} Only show products in stock
            </label>
          </p>
        </div>
      </div>
    );
  }
}

export default SearchBar;
