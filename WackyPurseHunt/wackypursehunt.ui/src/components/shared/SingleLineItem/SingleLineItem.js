import React from 'react';

import './SingleLineItem.scss';

class SingleLineItem extends React.Component {
  render() {
    const { item } = this.props;
    console.error('item', item);
    return (
          <tbody>
            <tr>
                <th scope="row"><img src={item.imageUrl} alt="product-purse" className="productPhotoInCart"></img></th>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>{item.qty}</td>
                <td>${item.subtotal}</td>
            </tr>
          </tbody>
    );
  }
}

export default SingleLineItem;
