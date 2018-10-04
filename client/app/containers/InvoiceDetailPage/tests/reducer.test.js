import { fromJS } from 'immutable';
import invoiceDetailPageReducer from '../reducer';

describe('invoiceDetailPageReducer', () => {
  it('returns the initial state', () => {
    expect(invoiceDetailPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
