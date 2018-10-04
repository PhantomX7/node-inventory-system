import { fromJS } from 'immutable';
import invoicePageReducer from '../reducer';

describe('invoicePageReducer', () => {
  it('returns the initial state', () => {
    expect(invoicePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
