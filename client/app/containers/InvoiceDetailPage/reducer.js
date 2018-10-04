/*
 *
 * InvoiceDetailPage reducer
 *
 */

import { GET_INVOICE, EMPTY_INVOICE } from './constants';

export const initialState = null;

function invoiceDetailPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INVOICE:
      return action.payload;
    case EMPTY_INVOICE:
      return null;
    default:
      return state;
  }
}

export default invoiceDetailPageReducer;
