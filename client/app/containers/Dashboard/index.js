/**
 *
 * Dashboard
 *
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom';

// import SideNav from '../../components/SideNav';
import DashboardMainPage from '../DashboardMainPage';
import ProductPage from '../ProductPage';
import CustomerPage from '../CustomerPage';
import Drawer from './Drawer';

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends Component {
  changeRoute = selected => {
    const { location, history } = this.props;
    const to = `/dashboard/${selected}`;
    if (location.pathname !== to) {
      history.push(to);
    }
  };

  render() {
    const { location } = this.props;
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="dashboard" />
        </Helmet>
        {/* <SideNav /> */}
        <Drawer changeRoute={this.changeRoute} selected={location.pathname}>
          <Switch>
            <Route path="/dashboard/main" exact component={DashboardMainPage} />
            <Route path="/dashboard/product" exact component={ProductPage} />
            <Route path="/dashboard/customer" exact component={CustomerPage} />
          </Switch>
        </Drawer>
      </div>
    );
  }
}

export default withRouter(Dashboard);
