/*
 *
 * InvoicePage actions
 *
 */
import axios from 'axios';
import { GET_ORDER_INVOICES, EMPTY_ORDER_INVOICES } from './constants';

let ROOT_URL = '';
if (process.env.NODE_ENV === 'development') {
  ROOT_URL = 'http://localhost:8000';
}

export function getOrderInvoices(start, end) {
  return async dispatch => {
    fetchOrderInvoices(dispatch, start, end);
  };
}

export function emptyOrderInvoices() {
  return dispatch => {
    dispatch({ type: EMPTY_ORDER_INVOICES });
  };
}

async function fetchOrderInvoices(dispatch, start, end) {
  dispatch({ type: EMPTY_ORDER_INVOICES });
  const { data } = await axios.get(
    `${ROOT_URL}/api/orderinvoice?start=${start}&end=${end}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    },
  );
  dispatch({ type: GET_ORDER_INVOICES, payload: data.orderInvoices });
}

export function addOrderInvoice(values, callback) {
  return async dispatch => {
    await axios.post(`${ROOT_URL}/api/orderinvoice`, values, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchOrderInvoices(dispatch, values.date, values.date);
    callback();
  };
}
