import React from 'react';
import productsData from '../../../helpers/data/productsData';
import ProductCard from '../../shared/ProductCard/ProductCard';
import FilterProducts from '../../shared/FilterProducts/FilterProducts';
import './Products.scss';

class Products extends React.Component {
  state = {
    products: [],
    theme: '',
    active: false,
  };

  componentDidMount() {
    productsData.getAllProducts()
      .then((products) => {
        this.setState({ products });
      });
  }

  handleChangetheme = (e) => {
    this.setState({ theme: e.target.value }, () => {
      productsData.getProductsByTheme((this.state.theme))
        .then((results) => {
          this.setState({ products: results.data });
        })
        .catch((error) => console.error('unable to get themes', error));
    });
  }

  render() {
    const { products } = this.state;
    const buildProductsList = products.map((product) => (
      <ProductCard key={product.id} product={product}/>));
    return (
      <React.Fragment>
        <div className="d-flex flex-wrap">
        <FilterProducts theme={this.state.theme}
          sortColor={this.state.sortColor}
          handleChangetheme={this.handleChangetheme}
          handleChangesortColor={this.handleChangesortColor}
          count={this.state.products.length}
          />
          </div>
        <div className="d-flex flex-wrap">
          {buildProductsList}
        </div>
      </React.Fragment>
    );
  }
}
export default Products;
