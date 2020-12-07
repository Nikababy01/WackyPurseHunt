import React from 'react';

import { Link } from 'react-router-dom';

import './ProductCard.scss';

class ProductCard extends React.Component {
  render() {
    const { product } = this.props;
    console.error('myproducts', product);
    const singleProductLink = `/products/${product.id}`;
    return (
      <div className="ProductCard col-4">
        <div className="card">
          <img className="card-img-top" src={product.imageUrl} alt="product card"/>
          <div className="card-body">
            <Link className="btn btn-warning" to={singleProductLink} product={product.id}>{product.title}</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
