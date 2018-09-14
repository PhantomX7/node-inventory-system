/*
 *
 * ProductPage reducer
 *
 */

import { GET_PRODUCTS, EMPTY_PRODUCTS } from './constants';

export const initialState = [];

function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return [...action.payload];
    case EMPTY_PRODUCTS:
      return [];
    default:
      return state;
  }
}

export default productReducer;
