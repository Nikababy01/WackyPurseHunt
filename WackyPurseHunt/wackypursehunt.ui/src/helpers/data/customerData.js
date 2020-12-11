import axios from 'axios';
import { baseUrl } from './constants.json';

const getAllCustomers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/customers`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getSingleCustomerIdByUid = () => axios.get(`${baseUrl}/customers/uid`);
const getSingleCustomer = (userId) => axios.get(`${baseUrl}/customers/${userId}`);

export default {
  getAllCustomers,
  getSingleCustomerIdByUid,
  getSingleCustomer,
};
