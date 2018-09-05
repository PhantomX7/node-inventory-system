/*
 *
 * LoginPage actions
 *
 */
import axios from 'axios';
import { push } from 'react-router-redux';
import { AUTH_USER, SET_TOKEN } from '../App/constants';
let ROOT_URL = '';
if (process.env.NODE_ENV === 'development') {
  ROOT_URL = 'http://localhost:8000';
}

export function signin(values) {
  const { username, password } = values;
  return async dispatch => {
    const { data } = await axios.post(`${ROOT_URL}/auth/signin`, {
      username,
      password,
    });
    localStorage.setItem('token', data.token);
    dispatch({ type: SET_TOKEN, payload: data.token });
    dispatch({ type: AUTH_USER, payload: data.user });
    dispatch(push('/dashboard'));
  };
}
