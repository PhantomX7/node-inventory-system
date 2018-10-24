/*
 *
 * InvoicePage actions
 *
 */
import axios from 'axios';
import { GET_ORDER_INVOICE, EMPTY_ORDER_INVOICE } from './constants';

let ROOT_URL = '';
if (process.env.NODE_ENV === 'development') {
  ROOT_URL = 'http://localhost:8000';
}

export function getOrderInvoice(id) {
  return async dispatch => {
    fetchOrderInvoice(dispatch, id);
  };
}

async function fetchOrderInvoice(dispatch, id) {
  dispatch({ type: EMPTY_ORDER_INVOICE });
  const { data } = await axios.get(`${ROOT_URL}/api/orderinvoice/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  dispatch({ type: GET_ORDER_INVOICE, payload: data.orderInvoice });
}

export function editOrderInvoice(id, values, callback) {
  return async dispatch => {
    await axios.put(`${ROOT_URL}/api/orderinvoice/${id}`, values, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchOrderInvoice(dispatch, id);
    callback();
  };
}

export function deleteOrderInvoice(id) {
  return async () => {
    await axios.delete(`${ROOT_URL}/api/orderinvoice/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  };
}

export function addOrderTransaction(values, callback) {
  return async dispatch => {
    await axios.post(`${ROOT_URL}/api/ordertransaction`, values, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchOrderInvoice(dispatch, values.orderInvoiceId);
    callback();
  };
}

export function editOrderTransaction(id, values, callback) {
  return async dispatch => {
    await axios.put(`${ROOT_URL}/api/ordertransaction/${id}`, values, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchOrderInvoice(dispatch, values.orderInvoiceId);
    callback();
  };
}

export function deleteOrderTransaction(id) {
  return async () => {
    await axios.delete(`${ROOT_URL}/api/ordertransaction/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  };
}
