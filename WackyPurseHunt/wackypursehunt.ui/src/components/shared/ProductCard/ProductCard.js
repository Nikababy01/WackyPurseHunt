import React from 'react';
import productData from '../../../helpers/data/productData';

import './ProductCard.scss';

class ProductCard extends React.Component {
  render() {
    const { product } = this.props;
    return (
      <div className="ProductCard col-4">
        <div className="card">
          <img className="card-img-top" src={product.imageUrl} alt="product card"/>
          <div className="card-body">
            <p className="card-title">{product.title}</p>
          </div>
        </div>

      </div>
    );
  }
}

export default ProductCard;
