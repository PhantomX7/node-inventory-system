/**
 *
 * InvoiceDetailPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import moment from 'moment';
import accounting from 'accounting';

import Button from '@material-ui/core/Button';

import Menu from 'components/Menu';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

import TransactionTable from './TransactionTable';
import TransactionAddModal from './TransactionAddModal';
import TransactionEditModal from './TransactionEditModal';

import { getInvoice } from './actions';
import { getProducts } from '../ProductPage/actions';

import './invoiceDetailPage.scss';

/* eslint-disable react/prefer-stateless-function */
export class InvoiceDetailPage extends React.Component {
  state = {
    modalAddTransactionVisible: false,
    modalEditTransactionVisible: false,
    editTransactionId: '',
  };

  getTransactionDetailById(id, transactions) {
    const transaction = transactions.find(transaction => transaction.id === id);
    if (!transaction) return {};
    return { ...transaction, productName: transaction.Product.name };
  }

  componentDidMount() {
    const { getInvoice, getProducts } = this.props;
    const { id } = this.props.match.params;
    getInvoice(id);
    getProducts();
  }

  render() {
    const { invoice } = this.props;
    const {
      modalAddTransactionVisible,
      modalEditTransactionVisible,
      editTransactionId,
    } = this.state;
    if (!invoice) return <div>Loading...</div>;
    const { Customer, Transactions } = invoice;
    const { id } = this.props.match.params;
    const invoiceDetailMenus = [
      {
        name: 'Add Transaction',
        onClick: () => {
          this.setState({ modalAddTransactionVisible: true });
        },
      },
    ];
    return (
      <div>
        <Helmet>
          <title>Invoice Detail</title>
          <meta name="description" content="Description of InvoiceDetailPage" />
        </Helmet>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <TransactionAddModal
              onClose={() =>
                this.setState({ modalAddTransactionVisible: false })
              }
              invoiceId={id}
              visible={modalAddTransactionVisible}
            />
            <TransactionEditModal
              onClose={() =>
                this.setState({ modalEditTransactionVisible: false })
              }
              invoiceId={id}
              transaction={this.getTransactionDetailById(
                editTransactionId,
                Transactions,
              )}
              visible={modalEditTransactionVisible}
            />
            <Card>
              <CardHeader color="primary">
                <h4 className="m-0">Invoice Detail</h4>
              </CardHeader>
              <CardBody>
                <div>Date : {moment(invoice.date).format('YYYY-MM-DD')}</div>
                <div>Customer name : {Customer.name}</div>
                <div>Payment status : {invoice.payment_status}</div>
                <div>Payment type : {invoice.type}</div>
                <div>Description : {invoice.description}</div>
                <div>
                  Total Capital :{' '}
                  {accounting.formatMoney(invoice.total_capital, 'Rp. ', 2)}
                </div>
                <div>
                  Total Sell Price :{' '}
                  {accounting.formatMoney(invoice.total_sell_price, 'Rp. ', 2)}
                </div>
                <div>
                  Total Profit :{' '}
                  {accounting.formatMoney(invoice.total_profit, 'Rp. ', 2)}
                </div>
                <Menu menus={invoiceDetailMenus}>
                  {handleClick => (
                    <Button
                      color="primary"
                      onClick={handleClick}
                      className="mb-3"
                    >
                      Invoice Detail Menu
                    </Button>
                  )}
                </Menu>
                <TransactionTable
                  transactions={Transactions}
                  onEdit={id => {
                    this.setState({
                      editTransactionId: id,
                      modalEditTransactionVisible: true,
                    });
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
  const invoice = state.get('invoiceDetail');
  return { invoice };
};

const withConnect = connect(
  mapStateToProps,
  { getInvoice, getProducts },
);

const withReducer = injectReducer({ key: 'invoiceDetail', reducer });

export default compose(
  withReducer,
  withConnect,
)(InvoiceDetailPage);
