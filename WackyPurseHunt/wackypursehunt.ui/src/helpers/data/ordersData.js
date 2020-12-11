import axios from 'axios';
import { baseUrl } from './constants.json';

const getSingleOrder = (id) => axios.get(`${baseUrl}/orders/${id}`);

const getCart = () => axios.get(`${baseUrl}/orders/cartByUid`);

// const postOrder = (newOrder) => axios.post(`${baseUrl}/orders`, newOrder);

const createCart = () => axios.post(`${baseUrl}/orders`);

export default {
  getSingleOrder,
  getCart,
  createCart,

};
