import axios from 'axios';
import { baseUrl } from './constants.json';

const getAllCustomers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/customers`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
const getSingleCustomer = (customerId) => axios.get(`${baseUrl}/customers/${customerId}`);

const getSingleCustomerIdByUid = () => axios.get(`${baseUrl}/customers/uid`);

export default {
  getAllCustomers,
  getSingleCustomerIdByUid,
  getSingleCustomer,
};
