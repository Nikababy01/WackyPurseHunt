import React from 'react';
import {
  Button,
  Collapse,
  CardBody,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
// import { Table } from 'reactstrap';

import SingleLineItem from '../../shared/SingleLineItem/SingleLineItem';

// import authData from '../../../helpers/data/authData';
import paymentTypesData from '../../../helpers/data/paymentTypesData';

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
    paymentTypeId: 0,
    selectedPaymentType: {},
    validOrder: true,
    paymentOption: '',
    accountNo: 0,
    expirationMonth: 0,
    expirationYear: 0,
    ccv: 0,
    modal: false,
    paymentTypes: [],
    dropdownOpen: false,
  }

  toggleModal = () => {
    this.setState({ modal: !this.setState.modal });
  }

  closeModal = () => {
    this.setState({ modal: false });
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
      userId,
      uid,
      lineItems,
      paymentTypeId,
      selectedPaymentType,
      validOrder,
    } = this.state;
    ordersData.getCart()
      .then((cartResponse) => {
        console.error('cartResponse', cartResponse);
        if (cartResponse.status === 200) {
          this.setState({
            cart: cartResponse.data,
            cartId: cartResponse.data.id,
            lineItems: cartResponse.data.lineItems,
            paymentTypeId: cartResponse.data.paymentTypeId,
          });
          if (paymentTypeId != null) {
            paymentTypesData.getSinglePaymentType(this.state.paymentTypeId)
              .then((paymentTypeResponse) => {
                console.error('paymenttypeinfo', paymentTypeResponse);
                this.setState({
                  selectedPaymentType: paymentTypeResponse.data,
                  paymentOption: paymentTypeResponse.data.paymentOption,
                  accountNo: paymentTypeResponse.data.accountNo,
                  expirationMonth: paymentTypeResponse.data.expirationMonth,
                  expirationYear: paymentTypeResponse.data.expirationYear,
                  ccv: paymentTypeResponse.data.ccv,
                });
              });
          }
        } else {
          this.setState({
            cart: null,
            cartId: 0,
            lineItems: [],
            paymentTypeId: 0,
            selectedPaymentType: {},
            validOrder: false,
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

  createCart = (e) => {
    e.preventDefault();
    const {
      cart,
      userId,
    } = this.state;
    ordersData.createCart()
      .then((newOrderResponse) => {
        console.error('createcart newOrderResponse', newOrderResponse);
        this.setState({
          cart: newOrderResponse.data,
          lineItems: [],
        });
      })
      .catch((error) => console.error('Unable to create the new shopping cart.', error));
  }

  changePaymentType = (e) => {
    e.preventDefault();
    this.setState({ paymentOption: e.target.value });
  }

  changeAccountNo = (e) => {
    e.preventDefault();
    this.setState({ accountNo: e.target.value * 1 });
  }

  changeExpMonth = (e) => {
    e.preventDefault();
    this.setState({ expirationMonth: e.target.value * 1 });
  }

  changeExpYear = (e) => {
    e.preventDefault();
    this.setState({ expirationYear: e.target.value * 1 });
  }

  changeCcv = (e) => {
    e.preventDefault();
    this.setState({ ccv: e.target.value * 1 });
  }

  addNewPaymentType = (e) => {
    e.preventDefault();
    const newPaymentTypeObject = {
      paymentOption: 'Please enter a payment type.',
      accountNo: 0,
      expirationMonth: 0,
      expirationYear: 0,
      ccv: 0,
      isActive: true,
      customerId: this.state.userId,
    };
    paymentTypesData.postPaymentType(newPaymentTypeObject)
      .then((newPaymentTypeResponse) => {
        console.error('NEW paymenttypeinfo', newPaymentTypeObject);
        console.error('NEW paymenttypeinfo', newPaymentTypeResponse);
        this.setState({
          selectedPaymentType: newPaymentTypeResponse.data,
          paymentOption: newPaymentTypeResponse.data.paymentOption,
          accountNo: newPaymentTypeResponse.data.accountNo,
          expirationMonth: newPaymentTypeResponse.data.expirationMonth,
          expirationYear: newPaymentTypeResponse.data.expirationYear,
          ccv: newPaymentTypeResponse.data.ccv,
        });
      });
  }

  placeOrder = (e) => {
    e.preventDefault();
    const {
      cart,
      cartId,
      user,
      userId,
      customerId,
      totalPrice,
      paymentTypeId,
      selectedPaymentType,
      purchaseDate,
      isActive,
      lineItems,
      paymentOption,
      accountNo,
      expirationMonth,
      expirationYear,
      ccv,
      validOrder,
    } = this.state;
    const updatedOrder = {
      id: cartId,
      customerId: cart.userId,
      isCompleted: true,
      totalPrice: cart.totalPrice,
      paymentTypeId: this.state.selectedPaymentType.id,
      purchaseDate: new Date(),
      isActive: cart.isActive,
      lineItems: cart.lineItems,
    };
    ordersData.updateOrder(cartId, updatedOrder)
      .then((updatedOrderResponse) => {
        console.error('updated order respo', updatedOrderResponse);
        this.props.history.push('/products');
      })
      .catch((error) => console.error('We could not finalize your order', error));
  }

  render() {
    const {
      cart,
      lineItems,
      user,
      paymentOption,
      accountNo,
      expirationMonth,
      expirationYear,
      ccv,
      paymentTypes,
      dropdownOpen,
      modal,
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
                <button type='submit' className="cart" onClick={this.toggleModal}>Checkout</button>
                  {/* modal with payment info below: */}
          <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Payment Information</ModalHeader>
            <ModalBody>
            <div>
            <Dropdown isOpen={dropdownOpen} toggle={this.toggleDropdown}>
                    <DropdownToggle caret>
                    Select a payment type
                    </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem key='newCard' value='newCard' onClick={this.addNewPaymentType}>Place Order</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
            </div>
            <div>
              <form>
                <div className='form-group'>
                  <label htmlFor='paymentOption'>Payment Type*</label>
                  <input type='text' className='form-control' id='paymentOption' placeholder={this.state.paymentOption} value={paymentOption} onChange={this.changePaymentType} />
                </div>
                <div className='form-group'>
                  <label htmlFor='paymentAccountNumber'>Account Number*</label>
                  <input type='text' className='form-control' id='paymentAccountNumber' placeholder={this.state.accountNo} value={accountNo} onChange={this.changeAccountNo} />
                </div>
                <div className='form-group'>
                  <label htmlFor='paymentExpMonth'>Expiration Month*</label>
                  <input className='form-control' type='text' id='paymentExpMonth' placeholder={this.state.expirationMonth} value={expirationMonth} onChange={this.changeExpMonth} />
                </div>
                <div className='form-group'>
                  <label htmlFor='paymentExpYear'>Expiration Year*</label>
                  <input className='form-control' type='text' id='paymentExpYear' placeholder={this.state.expirationYear} value={expirationYear} onChange={this.changeExpYear} />
                </div>
                <div className='form-group'>
                  <label htmlFor='paymentCcv'>CCV*</label>
                  <input className='form-control' id='paymentCcv' placeholder={this.state.ccv} value={ccv} onChange={this.changeCcv} ></input>
                </div>
              </form>
            </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.placeOrder}>Place Order</Button>{' '}
                <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
              </ModalFooter>
            </Modal>
            </div>
          </div>
      }
  </div>
    );
  }
}

export default ShoppingCart;
