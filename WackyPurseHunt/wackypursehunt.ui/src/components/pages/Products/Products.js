import React, { Component } from 'react';
import productData from '../../../helpers/data/productData';
import ProductCard from '../../shared/ProductCard/ProductCard';

class Products extends React.Component {
  state = {
    products: [],
  };

  render() {
    const { products } = this.state;
    const buildProductsList = products.map((product) => (
      <ProductCard key={product.id} product={product}/>));
    return (
        <div className= "d-flex flex-wrap">
          {buildProductsList}
        </div>
    );
  }
}
export default Products;
