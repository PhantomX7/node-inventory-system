/*
 *
 * InvoicePage reducer
 *
 */

import { GET_INVOICES, EMPTY_INVOICES } from './constants';

export const initialState = [];

function invoicePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INVOICES:
      return [...action.payload];
    case EMPTY_INVOICES:
      return [];
    default:
      return state;
  }
}

export default invoicePageReducer;
