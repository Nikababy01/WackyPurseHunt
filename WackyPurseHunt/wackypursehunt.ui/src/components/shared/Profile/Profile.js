import React from 'react';
import './Profile.scss';

class Profile extends React.Component {
  render() {
    const { customer } = this.props;
    return (
            <>
            <strong>{customer.firstName}{customer.lastName}</strong>
                <ul>
                    <li>Email: {customer.email} </li>
                    <li>Phone: {customer.phoneNumber} </li>
                    <li>Address: {customer.streetAddress}{customer.city}{customer.state}{customer.zipcode} </li>
                </ul>
            </>
    );
  }
}

export default Profile;
