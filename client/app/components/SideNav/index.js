/**
 *
 * TextInput
 *
 */

import React from 'react';
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from '@trendmicro/react-sidenav';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'react-router-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBox } from '@fortawesome/free-solid-svg-icons';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const SideNavCustom = ({ location, push }) => (
  <React.Fragment>
    <SideNav
      onSelect={selected => {
        const to = `/dashboard/${selected}`;
        if (location.pathname !== to) {
          push(to);
        }
      }}
      style={{ position: 'fixed' }}
    >
      <Toggle />
      <Nav defaultSelected="main">
        <NavItem eventKey="main">
          <NavIcon>
            <FontAwesomeIcon icon={faCoffee} />
          </NavIcon>
          <NavText>Dashboard</NavText>
        </NavItem>
        <NavItem eventKey="product">
          <NavIcon>
            <FontAwesomeIcon icon={faBox} />
          </NavIcon>
          <NavText>Product</NavText>
        </NavItem>
      </Nav>
    </SideNav>
  </React.Fragment>
);

const withConnect = connect(
  null,
  { push },
);
export default compose(
  withRouter,
  withConnect,
)(SideNavCustom);
