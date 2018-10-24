import { fromJS } from 'immutable';
import orderInvoiceDetailPageReducer from '../reducer';

describe('orderInvoiceDetailPageReducer', () => {
  it('returns the initial state', () => {
    expect(orderInvoiceDetailPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
