import React from 'react';
import _ from 'lodash';

import SearchBar from './SearchBar.jsx';
import ProductTable from './ProductTable.jsx';

class FilterableList extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      stocksOnly: false
    };
    // this.toggleStockChange = this.toggleStockChange.bind(this);
    // this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  getData() {
    return [
      { id: '100', name: 'Football', stock: true, price: '$ 2.99' },
      { id: '200', name: 'Baseball', stock: false, price: '$ 1.99' },
      { id: '300', name: 'Basketball', stock: true, price: '$ 4.99' }
    ];
  }
  filter() {
    return _.filter(this.getData(), (row) => {
      return (!this.state.stocksOnly || row.stock) && _.includes(_.lowerCase(row.name), _.lowerCase(this.state.query));
    });
  }

  toggleStockChange(e) {
    this.setState({
      stocksOnly: e.target.checked
    });
  }

  handleQueryChange(e) {
    this.setState({
      query: e.target.value
    });
  }

  render() {
    return (
      <div className="box">
        <SearchBar query={this.state.query} stocksOnly={this.state.stocksOnly}
          onQueryChange={(e) => this.handleQueryChange(e)} onStockChange={(e) => this.toggleStockChange(e)} />
        <ProductTable subset={this.filter()} />
      </div>
    );
  }
}

export default FilterableList;
