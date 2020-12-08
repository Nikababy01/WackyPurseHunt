import React from 'react';
import { Link } from 'react-router-dom';
import productData from '../../../helpers/data/productData';
import './Singleview.scss';

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
      <div>
      <Link to='/products' className="return-back"><i className="fas fa-backward"></i>  Back To Products</Link>
    {
    product.isActive
      ? <div className="singleview-container">
        <div className="row">
          <div className="col-5">
        <img src={product.imageUrl} alt="item" className="productImages"/>
        </div>
        <div className="col-7">
        <p className="product-title">{product.title}</p>
        <p className="price">Price: ${product.price}.00</p>
        <p className="desc">{product.description}</p>
        <label htmlFor="product-quantity">Quantity</label>
        <input className="qty-input" type="text" value="1"/>
        <button className="cart">Add to Cart</button>
      </div>
      </div>
      </div>
      : <div>
        <p>This product is no longer available. Please select a different product. Thank you for your understanding!</p>
      </div>
  }
</div>
    );
  }
}
export default Singleview;
