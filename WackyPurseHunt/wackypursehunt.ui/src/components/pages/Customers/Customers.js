import React from 'react';
import './Customers.scss';
import customerData from '../../../helpers/data/customerData';
import Profile from '../../shared/Profile/Profile';

class Customers extends React.Component {
  state = { customers: [] };

  componentDidMount() {
    customerData.getAllCustomers()
      .then((customers) => { this.setState({ customers }); });
  }

  render() {
    const { customers } = this.state;
    const buildCustomerList = customers.map((customer) => (<Profile key={customer.id} customer={customer}/>));

    return (
          <div>
          {buildCustomerList}
          </div>
    );
  }
}

export default Customers;
