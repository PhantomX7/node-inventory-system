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
} from 'redux-form/immutable';
import { Clear as ClearIcon } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';

import TextInput from 'components/TextInput';
import SelectInput from 'components/SelectInput';
import LoadingButton from 'components/LoadingButton';

import { addOrderInvoice } from './actions';

class OrderInvoiceAddModal extends Component {
  state = {
    loading: false,
  };

  handleFormSubmit = async values => {
    const { addOrderInvoice, onClose, reset } = this.props;
    this.setState({ loading: true });
    try {
      await addOrderInvoice(values.toObject(), () => {
        reset();
        onClose();
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

  render() {
    const { visible, onClose, handleSubmit } = this.props;
    return (
      <section>
        <Modal visible={visible} width="60%" height="80%" effect="fadeInUp">
          <div className="d-flex justify-content-between">
            <h2 className="pl-5 pt-3">Add Order Invoice</h2>
            <Button color="secondary" onClick={() => onClose()}>
              <ClearIcon />
            </Button>
          </div>
          <hr className="m-0" />
          <div className="m-4" style={{ height: '80%', padding: '0 3%' }}>
            <form
              className="add-order-invoice-form"
              onSubmit={handleSubmit(this.handleFormSubmit)}
            >
              <Field
                name="payment_status"
                component={SelectInput}
                label="Payment Status"
              >
                <MenuItem value="false">Not Paid</MenuItem>
                <MenuItem value="true">Paid</MenuItem>
              </Field>
              <Field
                name="description"
                component={TextInput}
                label="Description"
                type="text"
              />
              <Field
                name="date"
                component={TextInput}
                label="Order Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <LoadingButton name="Add Order" isLoading={this.state.loading} />
            </form>
          </div>
        </Modal>
      </section>
    );
  }
}

function validate(values) {
  const { date, payment_status } = values.toObject();
  const errors = {};
  if (!payment_status) {
    errors.payment_status = 'Please select a payment status';
  }
  if (!date) {
    errors.date = 'Please enter a date';
  }
  // errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

const mapStateToProps = state => ({
  formStates: getFormValues('addorderinvoice')(state),
});

const withForm = reduxForm({
  form: 'addorderinvoice',
  validate,
});

const withConnect = connect(
  mapStateToProps,
  { addOrderInvoice },
);

export default compose(
  withForm,
  withConnect,
)(OrderInvoiceAddModal);
