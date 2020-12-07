import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import productData from '../../../helpers/data/productData';

class Singleview extends React.Component {
  state = {
    selectedProduct: {},
  }

  // buildSingleView = () => {
  //   const { selectedProductId } = this.state;
  //   productData.getSingleProduct(selectedProductId)
  //     .then((response) => {
  //       this.setState({
  //         selectedProduct: response.data,
  //         selectedProductId: response.data.id,
  //       });
  //     })
  //     .catch((error) => console.error('Unable to get the selected product', error));
  // }

  componentDidMount() {
    const { productId } = this.props.match.parms;
    productData.getSingleProduct(productId)
      .then((response) => this.setState({ selectedProduct: response.data }))
      .catch((err) => console.error('unable to get single product: ', err));
  }

  render() {
    const { selectedProduct } = this.state;
    return (
      <div className="Singleview">
        <h1>{selectedProduct.title}</h1>
        <img src="selectedProduct.imageUrl" alt="item"/>
        <h3>Price: ${selectedProduct.price}</h3>
        <h4>{selectedProduct.description}</h4>
        <h6>Product Theme: {selectedProduct.productThemeId}</h6>
      </div>
    );
  }
}
export default Singleview;
