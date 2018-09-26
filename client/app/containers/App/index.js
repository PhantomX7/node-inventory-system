/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from 'containers/LoginPage/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import requireAuth from 'hoc/requireAuth';

import 'bootstrap/dist/css/bootstrap.min.css';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

import { getMe } from './actions';

import './app.css';

class App extends Component {
  componentDidMount() {
    const { token, getMe } = this.props;
    if (token) {
      getMe();
    }
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/dashboard" component={requireAuth(Dashboard)} />
          <Route component={NotFoundPage} />
        </Switch>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { token, user } = state.get('auth');
  return {
    token,
    user,
  };
};

const withConnect = connect(
  mapStateToProps,
  { getMe },
);

const withReducer = injectReducer({ key: 'auth', reducer });

export default compose(
  withRouter,
  withReducer,
  withConnect,
)(App);
