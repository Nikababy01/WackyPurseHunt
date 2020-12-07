import React from 'react';
import { Link } from 'react-router-dom';

import productShape from '../../../helpers/propz/productShape';
import './ProductCard.scss';

class ProductCard extends React.Component {
  static propTypes = {
    product: productShape.productShape,
  }

  render() {
    const { product } = this.props;
    const singleLink = `/products/${product.id}`;
    return (
      <div className="ProductCard col-4">
        <div className="card">
          <img className="card-img-top" src={product.imageUrl} alt="product card"/>
          <div className="card-body">
            <p className="card-title">{product.title}</p>
            <Link className="btn btn-info" to={singleLink}>View More</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
