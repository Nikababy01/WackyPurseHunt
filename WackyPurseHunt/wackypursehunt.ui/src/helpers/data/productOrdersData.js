import axios from 'axios';
import { baseUrl } from './constants.json';

const postProductOrder = (newProductOrder) => axios.post(`${baseUrl}/lineitems/newOrder`, newProductOrder);

const postProductOrderBasedOnProductAndOrderIds = (productId, orderId, qty) => axios.post(`${baseUrl}/lineitems/${productId}/${orderId}/${qty}`);

export default {
  postProductOrder,
  postProductOrderBasedOnProductAndOrderIds,
};
