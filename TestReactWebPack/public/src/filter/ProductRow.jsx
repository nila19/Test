import React from 'react';

class ProductRow extends React.Component {
  render() {
    return (
      <div className="columns">
        <div className="column tc">{this.props.product.name}</div>
        <div className="column tc">{this.props.product.price}</div>
      </div>
    );
  }
}

export default ProductRow;
