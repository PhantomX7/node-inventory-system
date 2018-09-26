/*
 *
 * CustomerPage actions
 *
 */
import axios from 'axios';
import { GET_CUSTOMERS, EMPTY_CUSTOMERS } from './constants';

let ROOT_URL = '';
if (process.env.NODE_ENV === 'development') {
  ROOT_URL = 'http://localhost:8000';
}

export function getCustomers() {
  return async dispatch => {
    fetchCustomers(dispatch);
  };
}

async function fetchCustomers(dispatch) {
  dispatch({ type: EMPTY_CUSTOMERS });
  const { data } = await axios.get(`${ROOT_URL}/api/customer`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  dispatch({ type: GET_CUSTOMERS, payload: data.customers });
}

export function addCustomer(values, callback) {
  return async dispatch => {
    await axios.post(`${ROOT_URL}/api/customer`, values, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchCustomers(dispatch);
    callback();
  };
}

export function editCustomer(id, values, callback) {
  return async dispatch => {
    await axios.put(`${ROOT_URL}/api/customer/${id}`, values, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchCustomers(dispatch);
    callback();
  };
}

export function deleteCustomer(id) {
  return async dispatch => {
    await axios.delete(`${ROOT_URL}/api/customer/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchCustomers(dispatch);
  };
}
