import axios from 'axios';
import { baseUrl } from './constants.json';

const getAllProducts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/products`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getSingleProduct = (id) => axios.get(`${baseUrl}/products/${id}`);

export default { getAllProducts, getSingleProduct };
