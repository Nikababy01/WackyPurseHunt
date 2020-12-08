import React from 'react';
import productData from '../../../helpers/data/productData';

class Singleview extends React.Component {
  state = {
    product: {},
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    productData.getSingleProduct(id)
      .then((response) => this.setState({ product: response.data }))
      .catch((err) => console.error('unable to get single product: ', err));
  }

  render() {
    const { product } = this.state;
    console.error('singleview', product);
    return (
      <div className="container view">
        <div className="row">
          <div className="col-5">
        <img src={product.imageUrl} alt="item"/>
        </div>
        <div className="col-7">
        <h1>{product.title}</h1>
        <h3>Price: ${product.price}</h3>
        <h4>{product.description}</h4>
        <h6>Product Theme: {product.productThemeId}</h6>
      </div>
      </div>
      </div>
    );
  }
}
export default Singleview;
