import React from 'react';
import { Link } from 'react-router-dom';
import ordersData from '../../../helpers/data/ordersData';
import productData from '../../../helpers/data/productData';
import productOrdersData from '../../../helpers/data/productOrdersData';
import authData from '../../../helpers/data/authData';
import './Singleview.scss';

class Singleview extends React.Component {
  state = {
    selectedProduct: {},
    selectedProductId: this.props.match.params.id,
    customerId: 0,
    uid: '',
    cart: {},
    lineItems: [],
    productQuantityOnSingleView: 1,
    previousQuantityInCart: 0,
    newproductQuantityForCart: 0,
    productInCart: false,
    relatedLineItemId: 0,
    relatedLineItem: {},
  }

  buildSingleView = () => {
    const { selectedProductId } = this.state;
    productData.getSingleProduct(selectedProductId)
      .then((response) => {
        this.setState({
          selectedProduct: response.data,
          selectedProductId: response.data.id,
          productQuantityOnSingleView: 1,
        });
      })
      .catch((error) => console.error('Unable to get the selected product', error));
  }

  getCart = () => {
    const {
      cart,
      customerId,
      uid,
      lineItems,
      selectedProductId,
      productInCart,
      productQuantityOnSingleView,
      newproductQuantityForCart,
      previousQuantityInCart,
      relatedLineItemId,
      relatedLineItem,
    } = this.state;
    ordersData.getCart()
      .then((orderResponse) => {
        if (orderResponse.status === 200) {
          this.setState({
            cart: orderResponse.data,
            lineItems: orderResponse.data.lineItems,
          });
          console.error('line items', this.state.lineItems);
          for (let i = 0; i < orderResponse.data.lineItems.length; i += 1) {
            if (orderResponse.data.lineItems[i].productId === this.state.selectedProductId) {
              this.setState({ previousQuantityInCart: orderResponse.data.lineItems[i].qty });
              this.setState({ productInCart: true });
              this.setState({ relatedLineItemId: orderResponse.data.lineItems[i].id });
              this.setState({ relatedLineItem: orderResponse.data.lineItems[i] });
            }
          }
        } else {
          this.setState({
            cart: null,
            lineItems: [],
          });
        }
      })
      .catch((error) => console.error('Unable to get the shopping cart.', error));
  }

  componentDidMount() {
    const {
      selectedProductId,
      userId,
      uid,
      productQuantityOnSingleView,
      previousQuantityInCart,
      newProductQuantityForCart,
      productInCart,
    } = this.state;
    const loggedUserUid = authData.getUid();
    this.setState({ uid: loggedUserUid });
    if (loggedUserUid !== '') {
      this.getCart(loggedUserUid);
    }
    this.buildSingleView(selectedProductId);
  }

  changeproductQuantityOnSingleView = (e) => {
    e.preventDefault();
    const {
      productQuantityOnSingleView,
      previousQuantityInCart,
      newProductQuantityForCart,
    } = this.state;
    this.setState({ productQuantityOnSingleView: e.target.value * 1 });
  }

  addToCart = (e) => {
    e.preventDefault();
    const {
      cart,
      customerId,
      selectedProduct,
      selectedProductId,
      productQuantityOnSingleView,
      productInCart,
      newProductQuantityForCart,
      relatedLineItemId,
      relatedLineItem,
    } = this.state;
    if (cart == null) {
      ordersData.createCart()
        .then((newOrderResponse) => {
          this.setState({
            cart: newOrderResponse.data,
            lineItems: [],
          });
          const orderId = newOrderResponse.data.id;
          const productId = this.state.selectedProductId;
          const newProductOrder = {
            productId,
            orderId,
            qty: this.state.productQuantityOnSingleView,
            isActive: true,
            title: '',
            price: 0,
            subtotal: 0,
          };
          productOrdersData.postProductOrder(newProductOrder)
            .then((productOrderResponse) => {
              const brandNewLineItem = productOrderResponse.data;
              const currentCart = this.state.cart;
              currentCart.lineItems.push(productOrderResponse.data);
              this.setState({ cart: currentCart });
              this.props.history.push('/cart');
            });
        })
        .catch((error) => console.error('Unable to create the new shopping cart.', error));
      // below is the scenario if a cart already exists!
    } else {
      const orderId = this.state.cart.id;
      console.error('order id for creating line item for existing cart', orderId);
      const productId = this.state.selectedProductId;
      const isActive = this.state.relatedLineItem;
      this.setState({ newProductQuantityForCart: this.state.productQuantityOnSingleView + this.state.previousQuantityInCart });
      const updatedProductOrder = {
        productId: this.state.relatedLineItem.productId,
        orderId: this.state.relatedLineItem.orderId,
        qty: (this.state.productQuantityOnSingleView + this.state.previousQuantityInCart),
        isActive: this.state.relatedLineItem.isActive,
      };
      if (this.state.productInCart == true) {
        productOrdersData.updateProductOrder(this.state.relatedLineItemId, updatedProductOrder)
          .then((updatedLineItemResponse) => {
            this.props.history.push('/cart');
          })
          .catch((error) => console.error('Could not update quantity for this line item.', error));
      } else if (productInCart == false) {
        productOrdersData.postProductOrderBasedOnProductAndOrderIds(productId, orderId, this.state.productQuantityOnSingleView)
          .then((newLineItemResponse) => {
            this.props.history.push('/cart');
          })
          .catch((error) => console.error('Could not create a new line item!', error));
      }
    }
  }

  render() {
    const { selectedProduct } = this.state;
    return (
      <div>
      <Link to='/products' className="return-back"><i className="fas fa-backward"></i>  Back To Products</Link>
    {
    selectedProduct.isActive
      ? <div className="singleview-container">
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
