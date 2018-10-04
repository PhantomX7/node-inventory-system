/**
 *
 * InvoicePage
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
import InvoiceTable from './InvoiceTable';
import InvoiceAddModal from './InvoiceAddModal';

import reducer from './reducer';

import { getInvoices } from './actions';
import { getCustomers } from '../CustomerPage/actions';

import './invoicePage.scss';

/* eslint-disable react/prefer-stateless-function */
export class InvoicePage extends React.Component {
  state = {
    modalAddInvoiceVisible: false,
  };

  componentDidMount() {
    const { getInvoices, getCustomers } = this.props;
    getCustomers();
    getInvoices();
  }

  render() {
    const { modalAddInvoiceVisible } = this.state;
    const { invoices, history } = this.props;
    const invoiceMenus = [
      {
        name: 'Add Invoice',
        onClick: () => {
          this.setState({ modalAddInvoiceVisible: true });
        },
      },
    ];
    return (
      <div>
        <Helmet>
          <title>Invoice</title>
          <meta name="description" content="Description of InvoicePage" />
        </Helmet>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <InvoiceAddModal
              onClose={() => this.setState({ modalAddInvoiceVisible: false })}
              visible={modalAddInvoiceVisible}
            />
            <Card>
              <CardHeader color="primary">
                <h4 className="m-0">Invoice</h4>
              </CardHeader>
              <CardBody>
                <Menu menus={invoiceMenus}>
                  {handleClick => (
                    <Button
                      color="primary"
                      onClick={handleClick}
                      className="mb-3"
                    >
                      Invoice Menu
                    </Button>
                  )}
                </Menu>
                <InvoiceTable
                  invoices={invoices}
                  onClick={id => {
                    history.push(`/dashboard/invoice/${id}`);
                  }}
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
  const invoices = state.get('invoices');
  const customers = state.get('customers');
  return { invoices, customers };
};

const withConnect = connect(
  mapStateToProps,
  { getInvoices, getCustomers },
);

const withReducer = injectReducer({ key: 'invoices', reducer });

export default compose(
  withReducer,
  withConnect,
)(InvoicePage);
