import axios from 'axios';
import { baseUrl } from './constants.json';

const getAllProducts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Products`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default { getAllProducts };
