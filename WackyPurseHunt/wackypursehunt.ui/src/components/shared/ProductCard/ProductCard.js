import React from 'react';

import { Link } from 'react-router-dom';

import './ProductCard.scss';

class ProductCard extends React.Component {
  render() {
    const { product, authed } = this.props;
    const singleProductLink = `/products/${product.id}`;
    return (
      <div className="ProductCard col-4">
        <div className="card">
         <Link to={singleProductLink} product={product.id} authed={authed}className="card-img-top" ><img className="card-img-top" src={product.imageUrl} alt="product card"/></Link>
          <div className="card-body">
            <div className="card-title">{product.title}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
