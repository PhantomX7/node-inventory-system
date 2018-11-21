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

import TextInput from 'components/TextInput';
import LoadingButton from 'components/LoadingButton';
import TransactionSelectDialog from './TransactionSelectDialog';

import { addReturnTransaction } from './actions';

class ReturnTransactionAddModal extends Component {
  state = {
    loading: false,
  };

  handleFormSubmit = async values => {
    const { invoiceId, addReturnTransaction, onClose, reset } = this.props;
    this.setState({ loading: true });
    try {
      await addReturnTransaction({ ...values.toObject(), invoiceId }, () => {
        onClose();
        reset();
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

  setSelectedTransaction(id) {
    const { dispatch, transactions } = this.props;
    if (!id) return;
    const transaction = transactions.find(transaction => transaction.id === id);
    dispatch(change('addreturntransaction', 'transactionId', id));
    dispatch(
      change('addreturntransaction', 'transactionAmount', transaction.amount),
    );
  }

  render() {
    const {
      visible,
      onClose,
      handleSubmit,
      transactions,
      formStates,
      // dispatch,
    } = this.props;
    return (
      <section>
        <Modal visible={visible} width="60%" height="80%" effect="fadeInUp">
          <div className="d-flex justify-content-between">
            <h2 className="pl-5 pt-3">Add Return Transaction</h2>
            <Button color="secondary" onClick={() => onClose()}>
              <ClearIcon />
            </Button>
          </div>
          <hr className="m-0" />
          <div className="m-4" style={{ height: '80%', padding: '0 3%' }}>
            <form
              className="add-return-transaction-form"
              onSubmit={handleSubmit(this.handleFormSubmit)}
            >
              <Field
                name="transactionId"
                component={TextInput}
                label="Transaction Id"
                type="text"
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <TransactionSelectDialog
                        title="Please select a Transaction"
                        transactions={transactions
                          .filter(transaction => !transaction.ReturnTransaction)
                          .map(transaction => ({
                            ...transaction,
                            ...transaction.Product,
                          }))}
                        onSelect={id => {
                          this.setSelectedTransaction(id);
                        }}
                      >
                        {handleClickOpen => (
                          <IconButton onClick={handleClickOpen}>
                            <EditIcon />
                          </IconButton>
                        )}
                      </TransactionSelectDialog>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Field
                name="amount"
                component={TextInput}
                label={`Amount - transaction amount: ${formStates &&
                  formStates.get('transactionAmount')}`}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <LoadingButton
                name="Add Return Transaction"
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
  const { transactionId, amount, transactionAmount } = values.toObject();
  const errors = {};
  if (!transactionId) {
    errors.transactionId = 'Please select a transaction';
  }
  if (!amount) {
    errors.amount = 'Please enter an amount of return';
  }
  if (amount && transactionAmount - amount < 0) {
    errors.amount = 'Amount is larger than transaction amount';
  }
  if (amount && amount <= 0) {
    errors.amount = 'Please enter an valid amount of return';
  }

  // errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

const mapStateToProps = state => ({
  formStates: getFormValues('addreturntransaction')(state),
});

const withForm = reduxForm({
  form: 'addreturntransaction',
  validate,
});

const withConnect = connect(
  mapStateToProps,
  { addReturnTransaction },
);

export default compose(
  withConnect,
  withForm,
)(ReturnTransactionAddModal);
