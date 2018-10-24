/*
 *
 * OrderInvoiceDetailPage reducer
 *
 */

import { GET_ORDER_INVOICE, EMPTY_ORDER_INVOICE } from './constants';

export const initialState = null;

function orderInvoiceDetailPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_INVOICE:
      return action.payload;
    case EMPTY_ORDER_INVOICE:
      return null;
    default:
      return state;
  }
}

export default orderInvoiceDetailPageReducer;
