import React from 'react';
import _ from 'lodash';
import ProductRow from './ProductRow.jsx';

class ProductTable extends React.Component {
  render() {
    const rows = _.map(this.props.subset, (row) => {
      return <ProductRow product={row} key={row.id} />
    });
    return (
      <div>
        <div className="columns">
          <div className="column is-half f4 tc">Name</div>
          <div className="column is-half f4 tc">Price</div>
        </div>
        {rows}
      </div>
    );
  }
}

export default ProductTable;
