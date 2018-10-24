/*
 *
 * InvoicePage actions
 *
 */
import axios from 'axios';
import { GET_INVOICE, EMPTY_INVOICE } from './constants';

let ROOT_URL = '';
if (process.env.NODE_ENV === 'development') {
  ROOT_URL = 'http://localhost:8000';
}

export function getInvoice(id) {
  return async dispatch => {
    fetchInvoice(dispatch, id);
  };
}

async function fetchInvoice(dispatch, id) {
  dispatch({ type: EMPTY_INVOICE });
  const { data } = await axios.get(`${ROOT_URL}/api/invoice/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  dispatch({ type: GET_INVOICE, payload: data.invoice });
}

export function editInvoice(id, values, callback) {
  return async dispatch => {
    await axios.put(`${ROOT_URL}/api/invoice/${id}`, values, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchInvoice(dispatch, id);
    callback();
  };
}

export function deleteInvoice(id) {
  return async () => {
    await axios.delete(`${ROOT_URL}/api/invoice/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  };
}

export function addTransaction(values, callback) {
  return async dispatch => {
    await axios.post(`${ROOT_URL}/api/transaction`, values, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchInvoice(dispatch, values.invoiceId);
    callback();
  };
}

export function editTransaction(id, values, callback) {
  return async dispatch => {
    await axios.put(`${ROOT_URL}/api/transaction/${id}`, values, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchInvoice(dispatch, values.invoiceId);
    callback();
  };
}

export function deleteTransaction(id) {
  return async () => {
    await axios.delete(`${ROOT_URL}/api/transaction/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  };
}
