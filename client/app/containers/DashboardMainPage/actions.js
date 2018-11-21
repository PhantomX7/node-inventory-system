/*
 *
 * InvoicePage actions
 *
 */
import axios from 'axios';
import moment from 'moment';
import { GET_STATISTIC, EMPTY_STATISTIC } from './constants';

let ROOT_URL = '';
if (process.env.NODE_ENV === 'development') {
  ROOT_URL = 'http://localhost:8000';
}

export function getStatistic(month, year) {
  return async dispatch => {
    const date = moment();
    dispatch({ type: EMPTY_STATISTIC });
    const { data } = await axios.get(
      `${ROOT_URL}/api/dashboard/monthlystatistic?month=${month ||
        date.month() + 1}&year=${year || date.year()}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      },
    );
    dispatch({ type: GET_STATISTIC, payload: data });
  };
}
