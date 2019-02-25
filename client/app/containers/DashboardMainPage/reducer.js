/*
 *
 * InvoicePage reducer
 *
 */

import { GET_STATISTIC, EMPTY_STATISTIC } from './constants';

export const initialState = {
  income: 0,
  incomeCash: 0,
  totalSales: 0,
  totalCashSales: 0,
};

function invoicePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STATISTIC:
      return { ...action.payload };
    case EMPTY_STATISTIC:
      return {};
    default:
      return state;
  }
}

export default invoicePageReducer;
