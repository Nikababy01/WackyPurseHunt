import React from 'react';
import { Link } from 'react-router-dom';
import productsData from '../../../helpers/data/productsData';
import authData from '../../../helpers/data/authData';
import ordersData from '../../../helpers/data/ordersData';

import './Singleview.scss';
import productOrdersData from '../../../helpers/data/productOrdersData';

class Singleview extends React.Component {
  state = {
    selectedProduct: {},
    selectedProductId: this.props.match.params.id,
    customerId: 0,
    uid: '',
    cart: {},
    lineItems: [],
    productQuantityOnSingleview: 1,
    productInCart: false,

  }

 buildSingleView = () => {
   const { selectedProductId } = this.state;
   productsData.getSingleProduct(selectedProductId)
     .then((response) => this.setState({
       selectedProduct: response.data,
       selectedProductId: response.data.id,
       productQuantityOnSingleview: 1,
     }))
     .catch((err) => console.error('unable to get single product: ', err));
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
     //  newproductQuantityForCart,
     //  previousQuantityInCart,
     //  relatedLineItemId,
     //  relatedLineItem,
   } = this.state;
   // const loggedUserUid = authData.getUid();
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
             this.setState({ productInCart: true });
             //  this.setState({ previousQuantityInCart: orderResponse.data.lineItems[i].qty });
             //  this.setState({ relatedLineItemId: orderResponse.data.lineItems[i].id });
             //  this.setState({ relatedLineItem: orderResponse.data.lineItems[i] });
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
     selectedProduct,
     customerId,
     uid,
     productQuantityOnSingleview,
     //  previousQuantityInCart,
     //  newProductQuantityForCart,
     productInCart,
   } = this.state;
   const loggedCustomerUid = authData.getUid();
   this.setState({ uid: loggedCustomerUid });
   if (loggedCustomerUid !== '') {
     this.getCart(loggedCustomerUid);
   }
   this.buildSingleView(selectedProductId);
 }

 addToCart = (e) => {
   e.preventDefault();
   const {
     cart,
     customerId,
     selectedProduct,
     selectedProductId,
     productQuantityOnSingleview,
     productInCart,
   } = this.state;
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
         qty: this.state.productQuantityOnSingleview,
         isActive: true,
         title: '',
         price: 0,
         subtotal: 0,
       };
       productOrdersData.postProductOrder(newProductOrder)
         .then((productOrderResponse) => {
           const currentCart = this.state.cart;
           currentCart.lineItems.push(productOrderResponse.data);
           this.setState({ cart: currentCart });
         });
     })
     .catch((error) => console.error('Unable to create second catch the new shopping cart.', error));
 }

 render() {
   const { selectedProduct, productQuantityOnSingleview } = this.state;
   // const { authed, product } = this.props;
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
        <input id= "product-quantity" className="qty-input" type="text" value={productQuantityOnSingleview}/>
        <button className="cart" onClick={this.addToCart}>Add to Cart</button>
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
