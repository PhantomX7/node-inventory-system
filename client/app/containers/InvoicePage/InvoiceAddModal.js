import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Field,
  reduxForm,
  getFormValues,
  SubmissionError,
  change,
} from 'redux-form/immutable';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Clear as ClearIcon } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import TextInput from 'components/TextInput';
import SelectInput from 'components/SelectInput';
import LoadingButton from 'components/LoadingButton';
import CustomerSelectDialog from './CustomerSelectDialog';

import { addInvoice } from './actions';

class InvoiceAddModal extends Component {
  state = {
    loading: false,
  };

  handleFormSubmit = async values => {
    const { addInvoice, onClose, reset } = this.props;
    this.setState({ loading: true });
    try {
      await addInvoice(values.toObject(), () => {
        onClose();
        reset();
        this.setState({ loading: false });
      });
    } catch ({ response }) {
      this.setState({ loading: false });
      response.data.error.errors.forEach(error => {
        throw new SubmissionError({
          [error.path]: error.message,
        });
      });
    }
  };

  renderCustomersName(id) {
    const { customers } = this.props;
    if (!customers || !id) return '';
    const { name } = customers.find(customer => customer.id === id);
    return name;
  }

  render() {
    const {
      visible,
      onClose,
      handleSubmit,
      customers,
      dispatch,
      formStates,
    } = this.props;
    return (
      <section>
        <Modal visible={visible} width="60%" height="80%" effect="fadeInUp">
          <div className="d-flex justify-content-between">
            <h2 className="pl-5 pt-3">Add Invoice</h2>
            <Button color="secondary" onClick={() => onClose()}>
              <ClearIcon />
            </Button>
          </div>
          <hr className="m-0" />
          <div className="m-4" style={{ height: '80%', padding: '0 3%' }}>
            <form
              className="add-invoice-form"
              onSubmit={handleSubmit(this.handleFormSubmit)}
            >
              <Field
                name="customerId"
                component={TextInput}
                label="Customer Id"
                type="text"
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <CustomerSelectDialog
                        title="Please select a customer"
                        customers={customers}
                        onSelect={id =>
                          dispatch(change('addinvoice', 'customerId', id))
                        }
                      >
                        {handleClickOpen => (
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={handleClickOpen}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                      </CustomerSelectDialog>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                name="customerName"
                label="Customer Name"
                color="primary"
                type="text"
                value={this.renderCustomersName(
                  formStates && formStates.get('customerId'),
                )}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Field
                name="payment_status"
                component={SelectInput}
                label="Payment Status"
              >
                <MenuItem value="false">Not Paid</MenuItem>
                <MenuItem value="true">Paid</MenuItem>
              </Field>
              <Field
                name="payment_type"
                component={TextInput}
                label="Payment Type"
                type="text"
              />
              <Field
                name="description"
                component={TextInput}
                label="Description"
                type="text"
              />
              <Field
                name="date"
                component={TextInput}
                label="Invoice Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <LoadingButton
                name="Add Invoice"
                isLoading={this.state.loading}
              />
            </form>
          </div>
        </Modal>
      </section>
    );
  }
}

function validate(values) {
  const { customerId, date, payment_status, payment_type } = values.toObject();
  const errors = {};
  if (!customerId) {
    errors.customerId = 'Please select a customer';
  }
  if (!payment_status) {
    errors.payment_status = 'Please select a payment status';
  }
  if (!payment_type) {
    errors.payment_type = 'Please enter a payment type';
  }
  if (!date) {
    errors.date = 'Please enter a date';
  }
  // errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

const mapStateToProps = state => {
  const customers = state.get('customers');
  return {
    customers,
    formStates: getFormValues('addinvoice')(state),
  };
};

const withForm = reduxForm({
  form: 'addinvoice',
  validate,
});

const withConnect = connect(
  mapStateToProps,
  { addInvoice },
);

export default compose(
  withForm,
  withConnect,
)(InvoiceAddModal);
