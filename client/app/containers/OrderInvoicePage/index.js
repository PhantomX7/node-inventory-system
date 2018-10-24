/**
 *
 * OrderInvoicePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';

import Button from '@material-ui/core/Button';

import TextInput from 'components/TextInput';
import Menu from 'components/Menu';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import LoadingButton from 'components/LoadingButton';

import injectReducer from 'utils/injectReducer';
import OrderInvoiceTable from './OrderInvoiceTable';
import OrderInvoiceAddModal from './OrderInvoiceAddModal';
import reducer from './reducer';

import { getOrderInvoices, emptyOrderInvoices } from './actions';

import './orderInvoicePage.scss';

/* eslint-disable react/prefer-stateless-function */
export class OrderInvoicePage extends React.Component {
  state = {
    modalAddOrderInvoiceVisible: false,
    loading: false,
  };

  componentDidMount() {
    const { emptyOrderInvoices } = this.props;
    emptyOrderInvoices();
  }

  handleFormSubmit = async values => {
    const { getOrderInvoices } = this.props;
    const { start, end } = values.toObject();
    this.setState({ loading: true });
    try {
      await getOrderInvoices(start, end);
      this.setState({ loading: false });
    } catch ({ response }) {
      this.setState({ loading: false });
    }
  };

  render() {
    const { modalAddOrderInvoiceVisible } = this.state;
    const { orderInvoices, history, handleSubmit } = this.props;
    const invoiceMenus = [
      {
        name: 'Add Order',
        onClick: () => {
          this.setState({ modalAddOrderInvoiceVisible: true });
        },
      },
    ];
    return (
      <div>
        <Helmet>
          <title>OrderInvoicePage</title>
          <meta name="description" content="Description of OrderInvoicePage" />
        </Helmet>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <OrderInvoiceAddModal
              onClose={() =>
                this.setState({ modalAddOrderInvoiceVisible: false })
              }
              visible={modalAddOrderInvoiceVisible}
            />
            <Card>
              <CardHeader color="primary">
                <h4 className="m-0">Order Invoice</h4>
              </CardHeader>
              <CardBody>
                <form
                  className="add-order-invoice-form mb-3"
                  onSubmit={handleSubmit(this.handleFormSubmit)}
                >
                  <GridContainer>
                    <GridItem xs={6} sm={4} md={3}>
                      <Field
                        name="start"
                        component={TextInput}
                        label="Start Date"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={6} sm={4} md={3}>
                      <Field
                        name="end"
                        component={TextInput}
                        label="End Date"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <LoadingButton
                    name="Get Orders"
                    isLoading={this.state.loading}
                  />
                </form>
                <Menu menus={invoiceMenus}>
                  {handleClick => (
                    <Button
                      color="primary"
                      onClick={handleClick}
                      className="mb-3"
                    >
                      Order Invoice Menu
                    </Button>
                  )}
                </Menu>
                <OrderInvoiceTable
                  orderInvoices={orderInvoices}
                  onClick={id => {
                    history.push(`/dashboard/orderinvoice/${id}`);
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

function validate(values) {
  const { start, end } = values.toObject();
  const errors = {};
  if (!start) {
    errors.start = 'Please select a start date';
  }
  if (!end) {
    errors.end = 'Please select a end date';
  }
  // errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

const mapStateToProps = state => {
  const orderInvoices = state.get('orderInvoices');
  return { orderInvoices };
};

const withConnect = connect(
  mapStateToProps,
  { getOrderInvoices, emptyOrderInvoices },
);

const withForm = reduxForm({
  form: 'getorderinvoice',
  validate,
});

const withReducer = injectReducer({ key: 'orderInvoices', reducer });

export default compose(
  withReducer,
  withConnect,
  withForm,
)(OrderInvoicePage);
