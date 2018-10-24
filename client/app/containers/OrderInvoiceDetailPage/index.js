/**
 *
 * OrderInvoiceDetailPage
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

import OrderTransactionTable from './OrderTransactionTable';
import OrderInvoiceEditModal from './OrderInvoiceEditModal';
import OrderTransactionAddModal from './OrderTransactionAddModal';
import OrderTransactionEditModal from './OrderTransactionEditModal';

import { getOrderInvoice, deleteOrderTransaction } from './actions';
import { getProducts } from '../ProductPage/actions';

import './orderInvoiceDetailPage.scss';

/* eslint-disable react/prefer-stateless-function */
export class OrderInvoiceDetailPage extends React.Component {
  state = {
    modalAddOrderTransactionVisible: false,
    modalEditOrderTransactionVisible: false,
    modalEditOrderInvoiceVisible: false,
    editOrderTransactionId: '',
  };

  async deleteOrderTransaction(id) {
    const {
      deleteOrderTransaction,
      getOrderInvoice,
      match,
      getProducts,
    } = this.props;
    await deleteOrderTransaction(id);
    await getOrderInvoice(match.params.id);
    await getProducts();
  }

  getOrderTransactionDetailById(id, transactions) {
    if (!transactions) return {};
    const transaction = transactions.find(transaction => transaction.id === id);
    if (!transaction) return {};
    return { ...transaction, productName: transaction.Product.name };
  }

  componentDidMount() {
    const { getOrderInvoice, getProducts } = this.props;
    const { id } = this.props.match.params;
    getOrderInvoice(id);
    getProducts();
  }

  render() {
    const { orderInvoice } = this.props;
    const {
      modalAddOrderTransactionVisible,
      modalEditOrderTransactionVisible,
      modalEditOrderInvoiceVisible,
      editOrderTransactionId,
    } = this.state;
    if (!orderInvoice) return <div>Loading...</div>;
    const { OrderTransactions } = orderInvoice;
    const { id } = this.props.match.params;
    const orderInvoiceDetailMenus = [
      {
        name: 'Edit Order Invoice',
        onClick: () => {
          this.setState({ modalEditOrderInvoiceVisible: true });
        },
      },
      {
        name: 'Add Order Transaction',
        onClick: () => {
          this.setState({ modalAddOrderTransactionVisible: true });
        },
      },
    ];
    return (
      <div>
        <Helmet>
          <title>Order Invoice Detail</title>
          <meta
            name="description"
            content="Description of OrderInvoiceDetailPage"
          />
        </Helmet>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <OrderTransactionAddModal
              onClose={() =>
                this.setState({ modalAddOrderTransactionVisible: false })
              }
              orderInvoiceId={id}
              visible={modalAddOrderTransactionVisible}
            />
            <OrderTransactionEditModal
              onClose={() =>
                this.setState({ modalEditOrderTransactionVisible: false })
              }
              orderInvoiceId={id}
              orderTransaction={this.getOrderTransactionDetailById(
                editOrderTransactionId,
                OrderTransactions,
              )}
              visible={modalEditOrderTransactionVisible}
            />
            <OrderInvoiceEditModal
              onClose={() =>
                this.setState({ modalEditOrderInvoiceVisible: false })
              }
              orderInvoice={{
                ...orderInvoice,
                date: moment(orderInvoice.date).format('YYYY-MM-DD'),
                payment_status: orderInvoice.payment_status.toString(),
              }}
              visible={modalEditOrderInvoiceVisible}
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
                      <td>
                        : {moment(orderInvoice.date).format('YYYY-MM-DD')}
                      </td>
                    </tr>
                    <tr>
                      <td>Payment status</td>
                      <td>
                        : {orderInvoice.payment_status ? 'Paid' : 'Not Paid'}
                      </td>
                    </tr>
                    <tr>
                      <td>Description</td>
                      <td>: {orderInvoice.description}</td>
                    </tr>
                    <tr>
                      <td>Total Buy Price</td>
                      <td>
                        :{' '}
                        {accounting.formatMoney(
                          orderInvoice.total_buy_price,
                          'Rp. ',
                          2,
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Menu menus={orderInvoiceDetailMenus}>
                  {handleClick => (
                    <Button
                      color="primary"
                      onClick={handleClick}
                      className="mb-3"
                    >
                      Order Invoice Detail Menu
                    </Button>
                  )}
                </Menu>
                <OrderTransactionTable
                  orderTransactions={OrderTransactions}
                  onEdit={id => {
                    this.setState({
                      editOrderTransactionId: id,
                      modalEditOrderTransactionVisible: true,
                    });
                  }}
                  onDelete={id => {
                    this.deleteOrderTransaction(id);
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
  const orderInvoice = state.get('orderInvoiceDetail');
  return { orderInvoice };
};

const withConnect = connect(
  mapStateToProps,
  { getOrderInvoice, deleteOrderTransaction, getProducts },
);

const withReducer = injectReducer({ key: 'orderInvoiceDetail', reducer });

export default compose(
  withReducer,
  withConnect,
)(OrderInvoiceDetailPage);
