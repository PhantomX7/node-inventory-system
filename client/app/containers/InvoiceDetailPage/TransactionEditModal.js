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

import { editTransaction } from './actions';
import { getProducts } from '../ProductPage/actions';

class TransactionAddModal extends Component {
  state = {
    loading: false,
  };

  handleFormSubmit = async values => {
    const {
      invoiceId,
      editTransaction,
      onClose,
      reset,
      transaction,
      getProducts,
    } = this.props;
    this.setState({ loading: true });
    try {
      await editTransaction(
        transaction.id,
        { ...values.toObject(), invoiceId },
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
            <h2 className="pl-5 pt-3">Edit Transaction</h2>
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
                name="capital_price"
                component={TextInput}
                label={`Price Capital : ${accounting.formatMoney(
                  formStates && formStates.get('capital_price'),
                  'Rp. ',
                  2,
                )}`}
                type="text"
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Field
                name="sell_price"
                component={TextInput}
                label={`Sell Price : ${accounting.formatMoney(
                  formStates && formStates.get('sell_price'),
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
                name="total_sell_price"
                label="Total Sell Price"
                color="primary"
                type="text"
                value={`${accounting.formatMoney(
                  formStates &&
                    formStates.get('sell_price') * formStates.get('amount'),
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
                name="Edit Transaction"
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
  const { sell_price, amount, stock } = values.toObject();
  const errors = {};
  if (!sell_price) {
    errors.sell_price = 'Please enter a sell price';
  }
  if (sell_price && sell_price <= 0) {
    errors.sell_price = 'Please enter a valid sell price';
  }
  if (!amount) {
    errors.amount = 'Please enter an amount of product';
  }
  if (amount && stock - amount < 0) {
    errors.amount = 'Not enough stock';
  }
  if (amount && amount < 0) {
    errors.amount = 'Please enter an valid amount of product';
  }

  // errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

const mapStateToProps = (state, ownProps) => ({
  formStates: getFormValues('edittransaction')(state),
  initialValues: ownProps.transaction,
});

const withForm = reduxForm({
  form: 'edittransaction',
  enableReinitialize: true,
  validate,
});

const withConnect = connect(
  mapStateToProps,
  { editTransaction, getProducts },
);

export default compose(
  withConnect,
  withForm,
)(TransactionAddModal);
