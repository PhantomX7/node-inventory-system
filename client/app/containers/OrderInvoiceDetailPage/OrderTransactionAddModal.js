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

import { addOrderTransaction } from './actions';
import { getProducts } from '../ProductPage/actions';

class OrderTransactionAddModal extends Component {
  state = {
    loading: false,
    selectedProduct: null,
  };

  handleFormSubmit = async values => {
    const {
      orderInvoiceId,
      addOrderTransaction,
      getProducts,
      onClose,
      reset,
    } = this.props;
    this.setState({ loading: true });
    try {
      await addOrderTransaction(
        { ...values.toObject(), orderInvoiceId },
        () => {
          reset();
          onClose();
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

  setSelectedProduct(id) {
    const { products, dispatch } = this.props;
    if (!products || !id) return;
    const product = products.find(product => product.id === id);
    this.setState({ selectedProduct: product });
    dispatch(change('addordertransaction', 'productId', id));
    dispatch(change('addordertransaction', 'stock', product.stock));
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
                label={`Amount - stock: ${formStates &&
                  formStates.get('stock')}`}
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
                name="Add Order Transaction"
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
  const { productId, buy_price, amount } = values.toObject();
  const errors = {};
  if (!productId) {
    errors.productId = 'Please select a product';
  }
  if (!buy_price) {
    errors.buy_price = 'Please enter a buy price';
  }
  if (buy_price && buy_price <= 0) {
    errors.buy_price = 'Please enter a valid buy price';
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

const mapStateToProps = state => {
  const products = state.get('products');
  return {
    products,
    formStates: getFormValues('addordertransaction')(state),
  };
};

const withForm = reduxForm({
  form: 'addordertransaction',
  validate,
});

const withConnect = connect(
  mapStateToProps,
  { addOrderTransaction, getProducts },
);

export default compose(
  withConnect,
  withForm,
)(OrderTransactionAddModal);
