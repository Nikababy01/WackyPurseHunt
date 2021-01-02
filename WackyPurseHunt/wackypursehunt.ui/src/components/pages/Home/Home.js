import React from 'react';
import productsData from '../../../helpers/data/productsData';
import NewArrivalCard from '../NewArrivalCard/NewArrivalCard';
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
    const buildTopFiveProducts = products.map((product) => (<NewArrivalCard key={product.id} product={product} authed={authed}/>));
    return (
      <div>
      <div className="jumbotron">
        <div className="jumbotronText">
          <h1 className="greeting">Thank you for visiting us at The Wacky Purse Hunt!</h1>
          <h2 className='aboutUs'>We are excited to bring the most exotic purses we could find!</h2>
        </div>
      </div>
      <br />
<div className="shopping-lady">
<img src="https://thumbs.dreamstime.com/t/black-silhouette-woman-holding-shopping-bags-isolated-over-white-background-black-silhouette-woman-holding-shopping-bags-isolated-102879082.jpg" alt="lady"/>
        <img src="https://thumbs.dreamstime.com/t/woman-standing-holding-shopping-bags-isolated-vector-silhouette-shoppers-sexy-girl-83471536.jpg" alt="lady"/>
        <img src="https://thumbs.dreamstime.com/t/stylish-silhouette-woman-waiting-holding-purse-22480244.jpg" alt="lady"/>
        <img src="https://thumbs.dreamstime.com/t/sexy-young-shopper-silhouette-chic-woman-shopping-bags-31256280.jpg" alt="lady"/>
</div>
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
