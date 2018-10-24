import { fromJS } from 'immutable';
import orderInvoicePageReducer from '../reducer';

describe('orderInvoicePageReducer', () => {
  it('returns the initial state', () => {
    expect(orderInvoicePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
