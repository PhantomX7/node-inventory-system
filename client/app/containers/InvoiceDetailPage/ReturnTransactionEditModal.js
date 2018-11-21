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

import TextInput from 'components/TextInput';
import LoadingButton from 'components/LoadingButton';

import { editReturnTransaction } from './actions';

class TransactionAddModal extends Component {
  state = {
    loading: false,
  };

  handleFormSubmit = async values => {
    const {
      invoiceId,
      editReturnTransaction,
      onClose,
      reset,
      returnTransaction,
    } = this.props;
    this.setState({ loading: true });
    try {
      await editReturnTransaction(
        returnTransaction.id,
        { ...values.toObject(), invoiceId },
        () => {
          onClose();
          reset();
        },
      );
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
    const { returnTransaction, visible, onClose, handleSubmit } = this.props;
    const { transactionAmount } = returnTransaction;
    return (
      <section>
        <Modal visible={visible} width="60%" height="80%" effect="fadeInUp">
          <div className="d-flex justify-content-between">
            <h2 className="pl-5 pt-3">Edit Return Transaction</h2>
            <Button color="secondary" onClick={() => onClose()}>
              <ClearIcon />
            </Button>
          </div>
          <hr className="m-0" />
          <div className="m-4" style={{ height: '80%', padding: '0 3%' }}>
            <form
              className="edit-return-transaction-form"
              onSubmit={handleSubmit(this.handleFormSubmit)}
            >
              <Field
                name="amount"
                component={TextInput}
                label={`Amount - transaction amount: ${transactionAmount}`}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br />
              <LoadingButton
                name="Edit Return Transaction"
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
  const { amount, transactionAmount } = values.toObject();
  const errors = {};
  if (!amount) {
    errors.amount = 'Please enter an amount of product';
  }
  if (amount && amount < 0) {
    errors.amount = 'Please enter an valid amount of product';
  }
  if (amount && amount > transactionAmount) {
    errors.amount = 'Amount must not exceed transaction amount';
  }

  // errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

const mapStateToProps = (state, ownProps) => ({
  formStates: getFormValues('editreturntransaction')(state),
  initialValues: ownProps.returnTransaction,
});

const withForm = reduxForm({
  form: 'editreturntransaction',
  enableReinitialize: true,
  validate,
});

const withConnect = connect(
  mapStateToProps,
  { editReturnTransaction },
);

export default compose(
  withConnect,
  withForm,
)(TransactionAddModal);
