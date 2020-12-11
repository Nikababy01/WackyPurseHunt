import axios from 'axios';
import { baseUrl } from './constants.json';

const getAllOrders = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/orders`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getSingleOrder = (id) => axios.get(`${baseUrl}/orders/${id}`);

const getCart = () => axios.get(`${baseUrl}/orders/cartByUid`);

// const postOrder = (newOrder) => axios.post(`${baseUrl}/orders`, newOrder);

const createCart = () => axios.post(`${baseUrl}/orders`);

export default {
  getAllOrders,
  getSingleOrder,
  getCart,
  createCart,

};
