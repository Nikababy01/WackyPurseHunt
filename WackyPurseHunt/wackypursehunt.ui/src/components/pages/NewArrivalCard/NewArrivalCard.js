import React from 'react';

import { Link } from 'react-router-dom';

import './NewArrivalCard.scss';

class NewArrivalCard extends React.Component {
  render() {
    const { product } = this.props;
    console.error('newarrival', product);
    const singleProductLink = `/products/${product.id}`;
    return (
      <div className="NewArrivalCard col-2">
        <div className="card-newArrival">
          <img className="card-img-top-newArrival" src={product.imageUrl} alt="product card"/>
          <div className="card-body-newArrival">
            <Link className="btn btn-warning" to={singleProductLink} product={product.id}>{product.title}</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default NewArrivalCard;
