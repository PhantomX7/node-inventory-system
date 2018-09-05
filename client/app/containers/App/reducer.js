import { AUTH_USER, SET_TOKEN } from './constants';

export const initialState = {
  token: localStorage.getItem('token'),
  user: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, user: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}

export default authReducer;
