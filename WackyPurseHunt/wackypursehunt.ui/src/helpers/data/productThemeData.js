import axios from 'axios';
import { baseUrl } from './constants.json';

const getAllProductThemes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/productsThemes`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default getAllProductThemes;
