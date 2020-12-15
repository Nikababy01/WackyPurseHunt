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
    previousQuantityInCart: 0,
    newproductQuantityForCart: 0,
    productInCart: false,
    relatedLineItemId: 0,
    relatedLineItem: {},
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

 getCartOrder = () => {
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
             this.setState({ previousQuantityInCart: orderResponse.data.lineItems[i].qty });
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
     selectedProduct,
     userId,
     uid,
     productQuantityOnSingleview,
     previousQuantityInCart,
     newProductQuantityForCart,
     productInCart,
   } = this.state;
   const loggedCustomerUid = authData.getUid();
   this.setState({ uid: loggedCustomerUid });
   if (loggedCustomerUid !== '') {
     this.getCartOrder(loggedCustomerUid);
   }
   this.buildSingleView(selectedProductId);
 }

 changeProductQuantityOnSingleView = (e) => {
   e.preventDefault();
   const {
     productQuantityOnSingleView,
     previousQuantityInCart,
     newProductQuantityForCart,
   } = this.state;
   this.setState({ productQuantityOnSingleView: e.target.value * 1 });
   console.error('quantity', this.state.productQuantityOnSingleView);
   console.error('target quantity', e.target.value * 1);
   // this.setState({ productQuantityOnSingleView: e.target.value * 1, newProductQuantityForCart: (this.state.previousQuantityInCart + (e.target.value * 1)) });
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
     newProductQuantityForCart,
     relatedLineItemId,
     relatedLineItem,
   } = this.state;
   if (cart == null) {
     console.error('selectedproduct', selectedProduct);
     const newOrder = { totalPrice: selectedProduct.price };
     console.error('neworder', newOrder);
     ordersData.postOrder(newOrder)
       .then((newOrderResponse) => {
         this.setState({
           cart: newOrderResponse.data,
           lineItems: [],
         });
         console.error('neworderResponse', newOrderResponse);
         const orderId = newOrderResponse.data.id;
         const productId = this.state.selectedProductId;
         const newProductOrder = {
           productId,
           orderId,
           qty: 1,
           isActive: true,
           title: '',
           price: 0,
           subtotal: 0,
         };
         console.error('newproductorder', newProductOrder);
         productOrdersData.postProductOrder(newProductOrder)
           .then((productOrderResponse) => {
             const currentCart = this.state.cart;
             currentCart.lineItems.push(productOrderResponse.data);
             this.setState({ cart: currentCart });
             console.error('current cart', currentCart);
             console.error('productorderResponse', productOrderResponse);
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
     if (this.state.productInCart === true) {
       productOrdersData.updateProductOrder(this.state.relatedLineItemId, updatedProductOrder)
         .then((updatedLineItemResponse) => {
           this.setState({ productInCart: true });
           this.props.history.push('/cart');
         })
         .catch((error) => console.error('Could not update quantity for this line item.', error));
     } else if (productInCart === false) {
       productOrdersData.postProductOrderBasedOnProductAndOrderIds(productId, orderId, this.state.productQuantityOnSingleView)
         .then((newLineItemResponse) => {
           this.props.history.push('/cart');
         })
         .catch((error) => console.error('Could not create a new line item!', error));
     }
   }
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
        <input id="product-quantity" className="qty-input" type="text" value={productQuantityOnSingleview} onChange={this.changeProductQuantityOnSingleView}/>
        <button type="submit" className="cart" onClick={this.addToCart}>Add to Cart</button>
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
