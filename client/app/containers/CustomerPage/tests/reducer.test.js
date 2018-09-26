import { fromJS } from 'immutable';
import customerPageReducer from '../reducer';

describe('customerPageReducer', () => {
  it('returns the initial state', () => {
    expect(customerPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
