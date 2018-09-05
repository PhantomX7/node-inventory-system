/**
 *
 * LoginPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { Link, Redirect } from 'react-router-dom';
import TextInput from '../../components/TextInput';
import { signin } from './actions';

/* eslint-disable react/prefer-stateless-function */
class LoginPage extends React.Component {
  handleFormSubmit = values => {
    const { signin } = this.props;
    signin(values.toObject());
  };
  render() {
    const { user, handleSubmit } = this.props;
    if (user) {
      return <Redirect to="/dashboard/main" />;
    }
    return (
      <div className="container">
        <Helmet>
          <title>Login Page</title>
          <meta name="description" content="Description of LoginPage" />
        </Helmet>
        <div className="text-center">
          <form
            className="login-form"
            onSubmit={handleSubmit(this.handleFormSubmit)}
          >
            <Field
              name="username"
              component={TextInput}
              label="Username"
              type="text"
            />
            <Field
              name="password"
              component={TextInput}
              label="Password"
              type="Password"
            />
            <div className="form-group text-center">
              <button className="btn button-primary w-100 m-0" type="submit">
                Sign in
              </button>
            </div>
            <div className="form-group text-center">
              <span className="auth-info">
                <Link to="/forgotpassword" className="text-green">
                  Forgot Password?
                </Link>
                <br /> Dont have an account?
                <Link to="/signup" className="text-green">
                  Sign up now
                </Link>.
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const { username, password } = values.toObject();
  const errors = {};
  if (!username) {
    errors.username = 'Please enter an username';
  }

  if (!password) {
    errors.password = 'Please enter a password';
  }

  if (password && password.length < 4) {
    errors.password = 'Password must at least 6 characters';
  }
  // errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

const mapStateToProps = state => {
  const { user } = state.get('auth');
  return { user };
};

const withForm = reduxForm({
  form: 'signin',
  validate,
});
const withConnect = connect(
  mapStateToProps,
  { signin },
);
export default compose(
  withForm,
  withConnect,
)(LoginPage);
