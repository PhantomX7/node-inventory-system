/**
 *
 * InvoicePage
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
import InvoiceTable from './InvoiceTable';
import InvoiceAddModal from './InvoiceAddModal';

import reducer from './reducer';

import { getInvoices, emptyInvoices } from './actions';
import { getCustomers } from '../CustomerPage/actions';

import './invoicePage.scss';

/* eslint-disable react/prefer-stateless-function */
export class InvoicePage extends React.Component {
  state = {
    modalAddInvoiceVisible: false,
    loading: false,
  };

  componentDidMount() {
    const { getCustomers, emptyInvoices } = this.props;
    getCustomers();
    emptyInvoices();
  }

  handleFormSubmit = async values => {
    const { getInvoices } = this.props;
    const { start, end } = values.toObject();
    this.setState({ loading: true });
    try {
      await getInvoices(start, end);
      this.setState({ loading: false });
    } catch ({ response }) {
      this.setState({ loading: false });
    }
  };

  render() {
    const { modalAddInvoiceVisible } = this.state;
    const { invoices, history, handleSubmit } = this.props;
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
                <form
                  className="add-invoice-form mb-3"
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
                    name="Get Invoices"
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
  const invoices = state.get('invoices');
  const customers = state.get('customers');
  return { invoices, customers };
};

const withConnect = connect(
  mapStateToProps,
  { getInvoices, emptyInvoices, getCustomers },
);

const withForm = reduxForm({
  form: 'getinvoice',
  validate,
});

const withReducer = injectReducer({ key: 'invoices', reducer });

export default compose(
  withReducer,
  withConnect,
  withForm,
)(InvoicePage);
