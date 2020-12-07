import React from 'react';
import productData from '../../../helpers/data/productData';

class SingleProductView extends React.Component {
  state = {
    product: {},
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    productData.getSingleProducts(id)
      .then((response) => this.setState({ product: response.data }))
      .catch((err) => console.error('unable to get single product: ', err));
  }

  render() {
    const { product } = this.state;
    return (
      <div>
        <div className="SingleProductView">
          <div className="row">
            <div className= "col-6">
        <img className="single-image-view" src={product.imageUrl} alt="product Card"/>
        </div>
        <div className="col-6">
    <h2>Price: {product.price}</h2>
    <p>{product.description}</p>
        </div>
      </div>
      </div>
      </div>
    );
  }
}
export default SingleProductView;
