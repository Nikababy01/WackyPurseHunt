import React from 'react';
import productsData from '../../../helpers/data/productData';
import ProductCard from '../../shared/ProductCard/ProductCard';
import './Home.scss';

class Home extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    productsData.getFiveLatestProducts()
      .then((products) => {
        this.setState({ products });
      });
  }

  render() {
    const { products } = this.state;
    const { authed } = this.props;
    const buildTopFiveProducts = products.map((product) => (<ProductCard key={product.id} product={product} authed={authed}/>));
    return (
      <div>
      <div className="jumbotron">
        <div className="jumbotronText">
          <h1 className="greeting">Thank you for visiting us at Wacky Purse Hunt!</h1>
          <h2 className='aboutUs'>We are excited to bring the most exotic purses we could find!</h2>
        </div>
      </div>
      <br />
      <div className="container-five-products-featured">
      <div className="row">
        <div className="title-box">
          <h2> New Arrivals</h2>
        </div>
        <div className="d-flex flex-wrap">
          {buildTopFiveProducts}
        </div>
        </div>
        </div>
        </div>
    );
  }
}
export default Home;
