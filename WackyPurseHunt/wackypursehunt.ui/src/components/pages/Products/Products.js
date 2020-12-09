import React, { Component } from 'react';
import productsData from '../../../helpers/data/productsData';
import ProductCard from '../../shared/ProductCard/ProductCard';
import './Products.scss';

class Products extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    productsData.getAllProducts()
      .then((products) => {
        this.setState({ products });
      });
  }

  render() {
    const { products } = this.state;
    const buildProductsList = products.map((product) => (
      <ProductCard key={product.id} product={product}/>));
    return (
        <div className="d-flex flex-wrap">
          {buildProductsList}
        </div>
    );
  }
}
export default Products;
