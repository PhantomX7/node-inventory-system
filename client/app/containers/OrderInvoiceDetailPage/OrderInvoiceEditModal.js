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

import { editOrderInvoice, deleteOrderInvoice } from './actions';

class InvoiceEditModal extends Component {
  state = {
    loading: false,
  };

  handleFormSubmit = async values => {
    const { editOrderInvoice, onClose, reset, orderInvoice } = this.props;
    this.setState({ loading: true });
    try {
      await editOrderInvoice(orderInvoice.id, values.toObject(), () => {
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
    const { deleteOrderInvoice, orderInvoice, history } = this.props;
    this.setState({ loading: true });
    const { OrderTransactions } = orderInvoice;
    if (OrderTransactions.length > 0) {
      triggerError(
        'Please delete all order transaction before deleting this invoice',
      );
      this.setState({ loading: false });
      return;
    }
    await deleteOrderInvoice(orderInvoice.id);
    history.push('/dashboard/orderinvoice');
  };

  render() {
    const { visible, onClose, handleSubmit } = this.props;
    return (
      <section>
        <Modal visible={visible} width="60%" height="80%" effect="fadeInUp">
          <div className="d-flex justify-content-between">
            <h2 className="pl-5 pt-3">Edit Order Invoice</h2>
            <Button color="secondary" onClick={() => onClose()}>
              <ClearIcon />
            </Button>
          </div>
          <hr className="m-0" />
          <div className="m-4" style={{ height: '80%', padding: '0 3%' }}>
            <form
              className="edit-order-invoice-form"
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
                label="Order Invoice Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div className="d-flex justify-content-between">
                <LoadingButton
                  name="Edit Order Invoice"
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
  formStates: getFormValues('editorderinvoice')(state),
  initialValues: ownProps.orderInvoice,
});

const withForm = reduxForm({
  form: 'editorderinvoice',
  enableReinitialize: true,
  validate,
});

const withConnect = connect(
  mapStateToProps,
  { editOrderInvoice, deleteOrderInvoice },
);

export default compose(
  withRouter,
  withConnect,
  withForm,
)(InvoiceEditModal);
