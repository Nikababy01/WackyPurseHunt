import React from 'react';
import productsData from '../../../helpers/data/productsData';
import ProductCard from '../../shared/ProductCard/ProductCard';
import FilterProducts from '../../shared/FilterProducts/FilterProducts';
import './Products.scss';

class Products extends React.Component {
  state = {
    products: [],
    theme: '',
    sortColor: '',
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

  handleChangesortColor = (e) => {
    this.setState({ sortColor: e.target.value }, () => {
      productsData.getProductsByColor((this.state.sortColor))
        .then((results) => {
          this.setState({ products: results.data });
        })
        .catch((error) => console.error('unable to get colors', error));
    });
  }

  handleChangesortSize = (e) => {
    this.setState({ sortSize: e.target.value }, () => {
      productsData.getProductsBySize((this.state.sortSize))
        .then((results) => {
          this.setState({ products: results.data });
        })
        .catch((error) => console.error('unable to get sizes', error));
    });
  }

  render() {
    const { products } = this.state;
    const { authed } = this.props;
    const buildProductsList = products.map((product) => (
      <ProductCard key={product.id} product={product}/>));
    return (
      <React.Fragment>
        <div className="d-flex flex-wrap">
        <FilterProducts theme={this.state.theme}
          sortColor={this.state.sortColor}
          sortSize={this.state.sortSize}
          handleChangetheme={this.handleChangetheme}
          handleChangesortColor={this.handleChangesortColor}
          handleChangesortSize={this.handleChangesortSize}
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
