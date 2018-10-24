/*
 *
 * OrderInvoicePage reducer
 *
 */

import { GET_ORDER_INVOICES, EMPTY_ORDER_INVOICES } from './constants';

export const initialState = [];

function orderInvoicePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_INVOICES:
      return [...action.payload];
    case EMPTY_ORDER_INVOICES:
      return [];
    default:
      return state;
  }
}

export default orderInvoicePageReducer;
