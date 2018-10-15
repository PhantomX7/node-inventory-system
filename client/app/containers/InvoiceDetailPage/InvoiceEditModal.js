import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Field,
  reduxForm,
  getFormValues,
  SubmissionError,
} from 'redux-form/immutable';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Clear as ClearIcon } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';

import TextInput from 'components/TextInput';
import SelectInput from 'components/SelectInput';
import LoadingButton from 'components/LoadingButton';
import ConfirmDialog from 'components/ConfirmDialog';

import { triggerError } from 'utils/toast';

import { editInvoice, deleteInvoice } from './actions';

class InvoiceEditModal extends Component {
  state = {
    loading: false,
  };

  handleFormSubmit = async values => {
    const { editInvoice, onClose, reset, invoice } = this.props;
    this.setState({ loading: true });
    try {
      await editInvoice(invoice.id, values.toObject(), () => {
        this.setState({ loading: false });
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

  handleDelete = async () => {
    const { deleteInvoice, invoice, history } = this.props;
    this.setState({ loading: true });
    const { Transactions } = invoice;
    if (Transactions.length > 0) {
      triggerError(
        'Please delete all transaction before deleting this invoice',
      );
      this.setState({ loading: false });
      return;
    }
    await deleteInvoice(invoice.id);
    history.push('/dashboard/invoice');
  };

  render() {
    const { visible, onClose, handleSubmit } = this.props;
    return (
      <section>
        <Modal visible={visible} width="60%" height="80%" effect="fadeInUp">
          <div className="d-flex justify-content-between">
            <h2 className="pl-5 pt-3">Edit Invoice</h2>
            <Button color="secondary" onClick={() => onClose()}>
              <ClearIcon />
            </Button>
          </div>
          <hr className="m-0" />
          <div className="m-4" style={{ height: '80%', padding: '0 3%' }}>
            <form
              className="edit-invoice-form"
              onSubmit={handleSubmit(this.handleFormSubmit)}
            >
              <Field
                name="customerName"
                component={TextInput}
                label="Customer Name"
                type="text"
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
              <div className="d-flex justify-content-between">
                <LoadingButton
                  name="Edit Invoice"
                  isLoading={this.state.loading}
                />
                <ConfirmDialog
                  title="Are you sure?"
                  content="this cannot be undone"
                  onYes={this.handleDelete}
                >
                  {handleClickOpen => (
                    <LoadingButton
                      className="deleteButton"
                      name="Delete Invoice"
                      isLoading={this.state.loading}
                      click={handleClickOpen}
                      type="button"
                    />
                  )}
                </ConfirmDialog>
              </div>
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

const mapStateToProps = (state, ownProps) => ({
  formStates: getFormValues('editinvoice')(state),
  initialValues: ownProps.invoice,
});

const withForm = reduxForm({
  form: 'addinvoice',
  enableReinitialize: true,
  validate,
});

const withConnect = connect(
  mapStateToProps,
  { editInvoice, deleteInvoice },
);

export default compose(
  withRouter,
  withConnect,
  withForm,
)(InvoiceEditModal);
