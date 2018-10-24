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
import accounting from 'accounting';
import { Clear as ClearIcon } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';

import TextInput from 'components/TextInput';
import LoadingButton from 'components/LoadingButton';

import { editOrderTransaction } from './actions';
import { getProducts } from '../ProductPage/actions';

class OrderTransactionAddModal extends Component {
  state = {
    loading: false,
  };

  handleFormSubmit = async values => {
    const {
      orderInvoiceId,
      editOrderTransaction,
      onClose,
      reset,
      orderTransaction,
      getProducts,
    } = this.props;
    this.setState({ loading: true });
    try {
      await editOrderTransaction(
        orderTransaction.id,
        { ...values.toObject(), orderInvoiceId },
        () => {
          onClose();
          reset();
        },
      );
      await getProducts();
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
    const { visible, onClose, handleSubmit, formStates } = this.props;
    return (
      <section>
        <Modal visible={visible} width="60%" height="80%" effect="fadeInUp">
          <div className="d-flex justify-content-between">
            <h2 className="pl-5 pt-3">Edit Order Transaction</h2>
            <Button color="secondary" onClick={() => onClose()}>
              <ClearIcon />
            </Button>
          </div>
          <hr className="m-0" />
          <div
            className="m-4"
            style={{ overflowY: 'scroll', height: '80%', padding: '0 3%' }}
          >
            <form
              className="edit-order-transaction-form"
              onSubmit={handleSubmit(this.handleFormSubmit)}
            >
              <Field
                name="productName"
                component={TextInput}
                label="Product Name"
                type="text"
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Field
                name="buy_price"
                component={TextInput}
                label={`Buy Price : ${accounting.formatMoney(
                  formStates && formStates.get('buy_price'),
                  'Rp. ',
                  2,
                )}`}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Field
                name="amount"
                component={TextInput}
                label="Amount"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                name="total_buy_price"
                label="Total Buy Price"
                color="primary"
                type="text"
                value={`${accounting.formatMoney(
                  formStates &&
                    formStates.get('buy_price') * formStates.get('amount'),
                  'Rp. ',
                  2,
                )}`}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br />
              <br />
              <LoadingButton
                name="Edit Order Transaction"
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
  const { buy_price, amount } = values.toObject();
  const errors = {};
  if (!buy_price) {
    errors.sell_price = 'Please enter a buy price';
  }
  if (buy_price && buy_price <= 0) {
    errors.sell_price = 'Please enter a valid buy price';
  }
  if (!amount) {
    errors.amount = 'Please enter an amount of product';
  }
  if (amount && amount < 0) {
    errors.amount = 'Please enter an valid amount of product';
  }

  // errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

const mapStateToProps = (state, ownProps) => ({
  formStates: getFormValues('editordertransaction')(state),
  initialValues: ownProps.orderTransaction,
});

const withForm = reduxForm({
  form: 'editordertransaction',
  enableReinitialize: true,
  validate,
});

const withConnect = connect(
  mapStateToProps,
  { editOrderTransaction, getProducts },
);

export default compose(
  withConnect,
  withForm,
)(OrderTransactionAddModal);
