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

const createNewProduct = (...newProduct) => {
  console.log('newProduct', newProduct);
  const productInfo = {
    title: newProduct.title,
    imageUrl: newProduct.imageUrl,
    productThemeId: newProduct.productThemeId,
    price: newProduct.price,
    description: newProduct.description,
    dateAdded: newProduct.dateAdded,
    avgStarRating: newProduct.avgStarRating,
    color: newProduct.color,
    size: newProduct.size,
    isActive: newProduct.isActive,
  };
  console.log('productInfo', productInfo);
  axios.post(`${baseUrl}/products`, productInfo);
};

const updateProduct = (id, updatedProduct) => axios.put(`${baseUrl}/products/${id}`, updatedProduct);
const removeProduct = (id, productId) => axios.delete(`${baseUrl}/product/${id}/product/${productId}`);

export default {
  getAllProducts,
  getSingleProduct,
  getFiveLatestProducts,
  getProductsByTheme,
  getProductsByColor,
  getProductsBySize,
  createNewProduct,
  updateProduct,
  removeProduct,
};
