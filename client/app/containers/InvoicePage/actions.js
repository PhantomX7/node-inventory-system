/*
 *
 * InvoicePage actions
 *
 */
import axios from 'axios';
import { GET_INVOICES, EMPTY_INVOICES } from './constants';

let ROOT_URL = '';
if (process.env.NODE_ENV === 'development') {
  ROOT_URL = 'http://localhost:8000';
}

export function getInvoices(start, end) {
  return async dispatch => {
    fetchInvoices(dispatch, start, end);
  };
}

export function emptyInvoices() {
  return dispatch => {
    dispatch({ type: EMPTY_INVOICES });
  };
}

async function fetchInvoices(dispatch, start, end) {
  dispatch({ type: EMPTY_INVOICES });
  const { data } = await axios.get(
    `${ROOT_URL}/api/invoice?start=${start}&end=${end}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    },
  );
  dispatch({ type: GET_INVOICES, payload: data.invoices });
}

export function addInvoice(values, callback) {
  return async dispatch => {
    await axios.post(`${ROOT_URL}/api/invoice`, values, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchInvoices(dispatch, values.date, values.date);
    callback();
  };
}
