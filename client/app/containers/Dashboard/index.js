/**
 *
 * Dashboard
 *
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import SideNav from '../../components/SideNav';

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="dashboard" />
        </Helmet>
        <SideNav />
        <Switch>
          <Route path="/dashboard/main" exact component={() => <div>Hi</div>} />
          {/* <Route path="/home" component={props => <Home />} />
          <Route path="/devices" component={props => <Devices />} /> */}
        </Switch>
      </div>
    );
  }
}

export default Dashboard;
