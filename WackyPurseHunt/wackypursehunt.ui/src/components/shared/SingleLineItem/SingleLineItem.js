import React from 'react';
import PropTypes from 'prop-types';
import productOrdersData from '../../../helpers/data/productOrdersData';

import './SingleLineItem.scss';

class SingleLineItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLineItemId: this.props.item.id,
    };
  }

  static propTypes = {
    buildCartPage: PropTypes.func,
  }

  inactivateLineItem = (e) => {
    const { selectedLineItemId } = this.state;
    const updatedLineItem = {
      id: this.props.item.id,
      productId: this.props.item.productId,
      orderId: this.props.item.orderId,
      qty: this.props.item.qty,
      title: this.props.item.title,
      price: this.props.item.price,
      subtotal: this.props.item.subtotal,
      isActive: false,
      imageUrl: this.props.item.imageUrl,
    };
    productOrdersData.updateProductOrder(selectedLineItemId, updatedLineItem)
      .then(() => {
        this.props.buildCartPage();
      })
      .catch((error) => console.error('Unable to save changes to the line item.', error));
  }

  render() {
    const { item } = this.props;
    return (
          <tbody>
            <tr>
                <th scope="row"><img src={item.imageUrl} alt="product-purse" className="productPhotoInCart"></img></th>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>{item.qty}</td>
                <td>${item.subtotal}</td>
                <td><i className="fas fa-trash-alt" onClick={this.inactivateLineItem}></i></td>
            </tr>
          </tbody>
    );
  }
}

export default SingleLineItem;
