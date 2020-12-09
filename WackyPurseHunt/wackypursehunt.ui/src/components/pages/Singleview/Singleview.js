import React from 'react';
import { Link } from 'react-router-dom';
import productsData from '../../../helpers/data/productsData';
import './Singleview.scss';

class Singleview extends React.Component {
  state = {
    selectedProduct: {},
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    productsData.getSingleProduct(id)
      .then((response) => this.setState({ selectedProduct: response.data }))
      .catch((err) => console.error('unable to get single product: ', err));
  }

  render() {
    const { selectedProduct } = this.state;
    console.error('singleview', selectedProduct);
    return (
      <div>
      <Link to='/products' className="return-back"><i className="fas fa-backward"></i>  Back To Products</Link>
    {
    selectedProduct.isActive
      ? <div className="single-view-container">
        <div className="row">
          <div className="col-5">
        <img src={selectedProduct.imageUrl} alt="item" className="productImages"/>
        </div>
        <div className="col-7">
        <p className="product-title">{selectedProduct.title}</p>
        <p className="price">Price: ${selectedProduct.price}.00</p>
        <p className="desc">{selectedProduct.description}</p>
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
