/**
 *
 * DashboardMainPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

/* eslint-disable react/prefer-stateless-function */
export class DashboardMainPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>DashboardMainPage</title>
          <meta name="description" content="Description of DashboardMainPage" />
        </Helmet>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(DashboardMainPage);
