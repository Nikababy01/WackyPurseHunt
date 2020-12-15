import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

import SingleLineItem from '../../shared/SingleLineItem/SingleLineItem';

// import authData from '../../../helpers/data/authData';

import ordersData from '../../../helpers/data/ordersData';
import customersData from '../../../helpers/data/customerData';

import './ShoppingCart.scss';

class ShoppingCart extends React.Component {
  state = {
    cart: {},
    cartId: 0,
    lineItems: [],
    user: {},
    userId: 0,
    uid: '',
    paymentTypeId: 1,
    // validOrder: true,
  }

  getUser = () => {
    customersData.getSingleCustomerIdByUid()
      .then((userIdReturned) => {
        this.setState({ userId: userIdReturned.data });
        console.error('userIdReturned', userIdReturned);
        customersData.getSingleCustomer(this.state.userId)
          .then((userResponse) => {
            console.error('userReponse', userResponse);
            this.setState({
              user: userResponse.data,
            });
          });
      })
      .catch((error) => console.error('Unable to get customer record', error));
  }

  getCart = () => {
    const {
      cart,
      customerId,
      uid,
      lineItems,
      // validOrder,
    } = this.state;
    ordersData.getCart()
      .then((cartResponse) => {
        console.error('cartResponse', cartResponse);
        if (cartResponse.status === 200) {
          this.setState({
            cart: cartResponse.data,
            cartId: cartResponse.data.id,
            lineItems: cartResponse.data.lineItems,
            customerId: cartResponse.data.customerId,
          });
        } else {
          this.setState({
            cart: null,
            cartId: 0,
            lineItems: [],
            paymentTypeId: 0,
            // selectedPaymentType: {},
            // validOrder: false,
          });
        }
        console.error('cart from db', cartResponse);
        console.error('current cart', this.state.cart);
      })
      .catch((error) => console.error('Unable to get the shopping cart.', error));
  }

  buildCartPage = () => {
    this.getUser();
    this.getCart();
  }

  componentDidMount() {
    this.buildCartPage();
  }

  render() {
    const {
      cart,
      lineItems,
      user,
    } = this.state;
    const buildLineItems = () => lineItems.map((item) => (
      <SingleLineItem key={item.Id} item={item} buildCartPage={this.buildCartPage} />
    ));
    return (
      <div>
      <h1>Your Shopping Cart</h1>
      <p>Here is your current order, {user.firstName}:</p>
      {
        (cart === null)
          ? <div>
          <p>Your cart is empty!</p>
          <p>Please go to the Products page and click Add to Cart on an item to get started!</p>
      </div>
          : <div>
          <h4>Total Price: ${cart.totalPrice}</h4>
          <h4>Items:</h4>
          <div>
            <Table hover>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Product</th>
                  <th>Price Per Unit</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Remove?</th>
                </tr>
              </thead>
              {buildLineItems()}
            </Table>
          </div>
          <div className="pb-5 pt-3">
                <Link to='/products'><button className="cart">Continue Shopping</button></Link>
              </div>
          <button type="submit" className="place-order" onClick={this.addToCart}>Checkout</button>
          </div>
      }
  </div>
    );
  }
}

export default ShoppingCart;
