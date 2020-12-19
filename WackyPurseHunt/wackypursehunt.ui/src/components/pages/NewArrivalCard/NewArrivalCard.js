import React from 'react';

import { Link } from 'react-router-dom';

import './NewArrivalCard.scss';

class NewArrivalCard extends React.Component {
  render() {
    const { product } = this.props;
    const singleProductLink = `/products/${product.id}`;
    return (
      <div className="NewArrivalCard col-lg-2">
        <div className="card-newArrival">
        <Link to={singleProductLink} product={product.id}><img className="card-img-top-newArrival" src={product.imageUrl} alt="product card"/></Link>
          <div className="card-body-newArrival">
            <div className="card-title-newArrival">{product.title}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewArrivalCard;
