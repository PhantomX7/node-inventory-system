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
import ReturnTransactionAddModal from './ReturnTransactionAddModal';
import ReturnTransactionEditModal from './ReturnTransactionEditModal';
import InvoiceEditModal from './InvoiceEditModal';

import {
  getInvoice,
  deleteTransaction,
  deleteReturnTransaction,
} from './actions';
import { getProducts } from '../ProductPage/actions';

import './invoiceDetailPage.scss';

/* eslint-disable react/prefer-stateless-function */
export class InvoiceDetailPage extends React.Component {
  state = {
    modalAddTransactionVisible: false,
    modalAddReturnTransactionVisible: false,
    modalEditTransactionVisible: false,
    modalEditReturnTransactionVisible: false,
    modalEditInvoiceVisible: false,
    editTransactionId: '',
    editReturnTransactionId: '',
  };

  getTransactionDetailById(id, transactions) {
    if (!transactions) return {};
    const transaction = transactions.find(transaction => transaction.id === id);
    if (!transaction) return {};
    return { ...transaction, productName: transaction.Product.name };
  }

  getReturnTransactionDetailById(id, transactions) {
    if (!transactions || !id) return {};
    const transaction = transactions.find(
      transaction => transaction.ReturnTransaction.id === id,
    );
    if (!transaction) return {};
    return {
      ...transaction.ReturnTransaction,
      transactionAmount: transaction.amount,
    };
  }

  async deleteTransaction(id) {
    const { deleteTransaction, getInvoice, match, getProducts } = this.props;
    await deleteTransaction(id);
    await getInvoice(match.params.id);
    await getProducts();
  }

  async deleteReturnTransaction(id) {
    const { deleteReturnTransaction, getInvoice, match } = this.props;
    await deleteReturnTransaction(id);
    await getInvoice(match.params.id);
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
      modalEditInvoiceVisible,
      modalAddReturnTransactionVisible,
      modalEditReturnTransactionVisible,
      editTransactionId,
      editReturnTransactionId,
    } = this.state;
    if (!invoice) return <div>Loading...</div>;
    const { Customer, Transactions } = invoice;
    const { id } = this.props.match.params;
    const invoiceDetailMenus = [
      {
        name: 'Edit Invoice',
        onClick: () => {
          this.setState({ modalEditInvoiceVisible: true });
        },
      },
      {
        name: 'Add Transaction',
        onClick: () => {
          this.setState({ modalAddTransactionVisible: true });
        },
      },
      {
        name: 'Add Return Transaction',
        onClick: () => {
          this.setState({ modalAddReturnTransactionVisible: true });
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
            <ReturnTransactionAddModal
              onClose={() =>
                this.setState({ modalAddReturnTransactionVisible: false })
              }
              invoiceId={id}
              transactions={Transactions}
              visible={modalAddReturnTransactionVisible}
            />
            <ReturnTransactionEditModal
              onClose={() =>
                this.setState({ modalEditReturnTransactionVisible: false })
              }
              invoiceId={id}
              returnTransaction={this.getReturnTransactionDetailById(
                editReturnTransactionId,
                Transactions,
              )}
              visible={modalEditReturnTransactionVisible}
            />
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
            <InvoiceEditModal
              onClose={() => this.setState({ modalEditInvoiceVisible: false })}
              invoice={{
                ...invoice,
                date: moment(invoice.date).format('YYYY-MM-DD'),
                customerName: Customer.name,
                payment_status: invoice.payment_status.toString(),
              }}
              visible={modalEditInvoiceVisible}
            />
            <Card>
              <CardHeader color="primary">
                <h4 className="m-0">Invoice Detail</h4>
              </CardHeader>
              <CardBody>
                <table>
                  <tbody>
                    <tr>
                      <td>Date</td>
                      <td>: {moment(invoice.date).format('YYYY-MM-DD')}</td>
                    </tr>
                    <tr>
                      <td>Customer name</td>
                      <td>: {Customer.name}</td>
                    </tr>
                    <tr>
                      <td>Payment status</td>
                      <td>: {invoice.payment_status ? 'Paid' : 'Not Paid'}</td>
                    </tr>
                    <tr>
                      <td>Payment type</td>
                      <td>: {invoice.payment_type}</td>
                    </tr>
                    <tr>
                      <td>Description</td>
                      <td>: {invoice.description}</td>
                    </tr>
                    <tr>
                      <td>Total Capital</td>
                      <td>
                        :{' '}
                        {accounting.formatMoney(
                          invoice.total_capital,
                          'Rp. ',
                          2,
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Total Sell Price</td>
                      <td>
                        :{' '}
                        {accounting.formatMoney(
                          invoice.total_sell_price,
                          'Rp. ',
                          2,
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Total Profit</td>
                      <td>
                        :{' '}
                        {accounting.formatMoney(
                          invoice.total_profit,
                          'Rp. ',
                          2,
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                  onDelete={id => {
                    this.deleteTransaction(id);
                  }}
                  onEditReturn={id => {
                    this.setState({
                      editReturnTransactionId: id,
                      modalEditReturnTransactionVisible: true,
                    });
                  }}
                  onDeleteReturn={id => {
                    this.deleteReturnTransaction(id);
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
  { getInvoice, getProducts, deleteTransaction, deleteReturnTransaction },
);

const withReducer = injectReducer({ key: 'invoiceDetail', reducer });

export default compose(
  withReducer,
  withConnect,
)(InvoiceDetailPage);
