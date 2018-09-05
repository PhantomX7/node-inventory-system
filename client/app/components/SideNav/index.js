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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBox } from '@fortawesome/free-solid-svg-icons';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const SideNavCustom = ({ location, history }) => (
  <React.Fragment>
    <SideNav
      onSelect={selected => {
        const to = `/dashboard/${selected}`;
        if (location.pathname !== to) {
          history.push(to);
        }
      }}
    >
      <Toggle />
      <Nav defaultSelected="dashboard">
        <NavItem eventKey="dashboard">
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

export default withRouter(SideNavCustom);
