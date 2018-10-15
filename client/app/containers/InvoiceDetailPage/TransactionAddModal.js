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
import accounting from 'accounting';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Clear as ClearIcon } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';

import TextInput from 'components/TextInput';
import LoadingButton from 'components/LoadingButton';
import ProductSelectDialog from './ProductSelectDialog';

import { addTransaction } from './actions';
import { getProducts } from '../ProductPage/actions';

class TransactionAddModal extends Component {
  state = {
    loading: false,
    selectedProduct: null,
  };

  handleFormSubmit = async values => {
    const {
      invoiceId,
      addTransaction,
      getProducts,
      onClose,
      reset,
    } = this.props;
    this.setState({ loading: true });
    try {
      await addTransaction({ ...values.toObject(), invoiceId }, () => {
        this.setState({ loading: false, selectedProduct: null });
        onClose();
        reset();
      });
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

  setSelectedProduct(id) {
    const { products, dispatch } = this.props;
    if (!products || !id) return;
    const product = products.find(product => product.id === id);
    this.setState({ selectedProduct: product });
    dispatch(change('addtransaction', 'productId', id));
    dispatch(change('addtransaction', 'capital_price', product.capital_price));
    dispatch(change('addtransaction', 'sell_price', product.sell_price));
    dispatch(change('addtransaction', 'stock', product.stock));
  }

  render() {
    const {
      visible,
      onClose,
      handleSubmit,
      products,
      formStates,
      // dispatch,
    } = this.props;
    const { selectedProduct } = this.state;
    return (
      <section>
        <Modal visible={visible} width="60%" height="80%" effect="fadeInUp">
          <div className="d-flex justify-content-between">
            <h2 className="pl-5 pt-3">Add Transaction</h2>
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
              className="add-invoice-form"
              onSubmit={handleSubmit(this.handleFormSubmit)}
            >
              <Field
                name="productId"
                component={TextInput}
                label="Product Id"
                type="text"
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <ProductSelectDialog
                        title="Please select a Product"
                        products={products}
                        onSelect={id => {
                          this.setSelectedProduct(id);
                        }}
                      >
                        {handleClickOpen => (
                          <IconButton onClick={handleClickOpen}>
                            <EditIcon />
                          </IconButton>
                        )}
                      </ProductSelectDialog>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                name="productName"
                label="Product Name"
                color="primary"
                type="text"
                value={(selectedProduct && selectedProduct.name) || ''}
                fullWidth
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
              <div>{`Sell Price Cash : ${accounting.formatMoney(
                selectedProduct && selectedProduct.sell_price_cash,
                'Rp. ',
                2,
              )}`}</div>
              <div>{`Sell Price Credit : ${accounting.formatMoney(
                selectedProduct && selectedProduct.sell_price_credit,
                'Rp. ',
                2,
              )}`}</div>
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
                label={`Amount - stock: ${formStates &&
                  formStates.get('stock')}`}
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
                name="Add Transaction"
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
  const { productId, sell_price, amount, stock } = values.toObject();
  const errors = {};
  if (!productId) {
    errors.productId = 'Please select a product';
  }
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

const mapStateToProps = state => {
  const products = state.get('products');
  return {
    products,
    formStates: getFormValues('addtransaction')(state),
  };
};

const withForm = reduxForm({
  form: 'addtransaction',
  validate,
});

const withConnect = connect(
  mapStateToProps,
  { addTransaction, getProducts },
);

export default compose(
  withConnect,
  withForm,
)(TransactionAddModal);
