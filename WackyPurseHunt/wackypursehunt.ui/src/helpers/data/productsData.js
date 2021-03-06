import axios from 'axios';
import { baseUrl } from './constants.json';

const getAllProducts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/products`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getFiveLatestProducts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/products/Top`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getSingleProduct = (id) => axios.get(`${baseUrl}/products/${id}`);
const getProductsByTheme = (productThemeId) => axios.get(`${baseUrl}/products/theme/${productThemeId}`);
const getProductsByColor = (color) => axios.get(`${baseUrl}/products/colorCode/${color}`);
const getProductsBySize = (size) => axios.get(`${baseUrl}/products/sizes/${size}`);

export default {
  getAllProducts,
  getSingleProduct,
  getFiveLatestProducts,
  getProductsByTheme,
  getProductsByColor,
  getProductsBySize,
};
