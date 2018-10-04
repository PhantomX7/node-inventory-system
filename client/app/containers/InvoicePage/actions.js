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

export function getInvoices() {
  return async dispatch => {
    fetchInvoices(dispatch);
  };
}

async function fetchInvoices(dispatch) {
  dispatch({ type: EMPTY_INVOICES });
  const { data } = await axios.get(`${ROOT_URL}/api/invoice`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  dispatch({ type: GET_INVOICES, payload: data.invoices });
}

export function addInvoice(values, callback) {
  return async dispatch => {
    await axios.post(`${ROOT_URL}/api/invoice`, values, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchInvoices(dispatch);
    callback();
  };
}

// export function editInvoice(id, values, callback) {
//   return async dispatch => {
//     await axios.put(`${ROOT_URL}/api/customer/${id}`, values, {
//       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//     });
//     fetchInvoices(dispatch);
//     callback();
//   };
// }
//
// export function deleteInvoice(id) {
//   return async dispatch => {
//     await axios.delete(`${ROOT_URL}/api/customer/${id}`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//     });
//     fetchInvoices(dispatch);
//   };
// }
