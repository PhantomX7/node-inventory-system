/**
 *
 * CustomerPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';

import Menu from 'components/Menu';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import injectReducer from 'utils/injectReducer';
import CustomerTable from './CustomerTable';
import CustomerAddModal from './CustomerAddModal';
import CustomerEditModal from './CustomerEditModal';

import reducer from './reducer';

import { getCustomers } from './actions';

import './customerPage.scss';

export class CustomerPage extends React.Component {
  state = {
    modalAddCustomerVisible: false,
    modalEditCustomerVisible: false,
    editCustomerId: '',
  };

  componentDidMount() {
    const { getCustomers } = this.props;
    getCustomers();
  }

  render() {
    const { customers } = this.props;
    const {
      modalAddCustomerVisible,
      modalEditCustomerVisible,
      editCustomerId,
    } = this.state;
    const customerMenus = [
      {
        name: 'Add Customer',
        onClick: () => {
          this.setState({ modalAddCustomerVisible: true });
        },
      },
    ];
    return (
      <div>
        <Helmet>
          <title>Customer</title>
          <meta name="description" content="Description of CustomerPage" />
        </Helmet>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomerAddModal
              onClose={() => this.setState({ modalAddCustomerVisible: false })}
              visible={modalAddCustomerVisible}
            />
            <CustomerEditModal
              onClose={() => this.setState({ modalEditCustomerVisible: false })}
              visible={modalEditCustomerVisible}
              customer={customers.find(
                customer => customer.id === editCustomerId,
              )}
            />
            <Card>
              <CardHeader color="primary">
                <h4 className="m-0">Customer</h4>
              </CardHeader>
              <CardBody>
                <Menu menus={customerMenus}>
                  {handleClick => (
                    <Button
                      color="primary"
                      onClick={handleClick}
                      className="mb-3"
                    >
                      Customer Menu
                    </Button>
                  )}
                </Menu>
                <CustomerTable
                  customers={customers}
                  onClick={id =>
                    this.setState({
                      modalEditCustomerVisible: true,
                      editCustomerId: id,
                    })
                  }
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const customers = state.get('customers');
  return { customers };
};

const withConnect = connect(
  mapStateToProps,
  { getCustomers },
);

const withReducer = injectReducer({ key: 'customers', reducer });

export default compose(
  withReducer,
  withConnect,
)(CustomerPage);
