/*
 *
 * CustomerPage reducer
 *
 */

import { GET_CUSTOMERS, EMPTY_CUSTOMERS } from './constants';

export const initialState = [];

function customerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CUSTOMERS:
      return [...action.payload];
    case EMPTY_CUSTOMERS:
      return [];
    default:
      return state;
  }
}

export default customerReducer;
