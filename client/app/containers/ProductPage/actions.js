/*
 *
 * ProductPage actions
 *
 */
import axios from 'axios';
import { GET_PRODUCTS, EMPTY_PRODUCTS } from './constants';

let ROOT_URL = '';
if (process.env.NODE_ENV === 'development') {
  ROOT_URL = 'http://localhost:8000';
}

export function getProducts() {
  return async dispatch => {
    fetchProducts(dispatch);
  };
}

async function fetchProducts(dispatch) {
  dispatch({ type: EMPTY_PRODUCTS });
  const { data } = await axios.get(`${ROOT_URL}/api/product`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  dispatch({ type: GET_PRODUCTS, payload: data.products });
}

export function addProduct(values, callback) {
  return async dispatch => {
    await axios.post(`${ROOT_URL}/api/product`, values, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchProducts(dispatch);
    callback();
  };
}

export function editProduct(id, values, callback) {
  return async dispatch => {
    await axios.post(`${ROOT_URL}/api/product/${id}`, values, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchProducts(dispatch);
    callback();
  };
}
