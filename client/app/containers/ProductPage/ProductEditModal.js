import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';
import { connect } from 'react-redux';
import accounting from 'accounting';
import { Field, reduxForm, getFormValues } from 'redux-form/immutable';
import { Clear as ClearIcon } from '@material-ui/icons';
import TextInput from '../../components/TextInput';
import LoadingButton from '../../components/LoadingButton';

import { editProduct } from './actions';

class ProductEditModal extends Component {
  state = {
    loading: false,
  };

  handleFormSubmit = values => {
    const { editProduct, onClose, reset, product } = this.props;
    this.setState({ loading: true });
    editProduct(product.id, values.toObject(), () => {
      onClose();
      reset();
      this.setState({ loading: false });
    });
  };

  render() {
    const { onClose, handleSubmit, formStates, visible, product } = this.props;
    return (
      <section>
        <Modal visible={visible} width="60%" height="80%" effect="fadeInUp">
          <div className="d-flex justify-content-between">
            <h2 className="pl-5 pt-3">Edit {product && product.name}</h2>
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
              className="add-product-form"
              onSubmit={handleSubmit(this.handleFormSubmit)}
            >
              <Field
                name="name"
                component={TextInput}
                label="Name"
                type="text"
              />
              <Field
                name="pinyin"
                component={TextInput}
                label="Pinyin"
                type="text"
              />
              <Field
                name="stock"
                component={TextInput}
                label="Stock"
                type="number"
              />
              <Field
                name="stock_description"
                component={TextInput}
                label="Stock Description"
                type="text"
              />
              <Field
                name="unit"
                component={TextInput}
                label="Unit"
                type="text"
              />
              <Field
                name="description"
                component={TextInput}
                label="Description"
                type="text"
              />
              <Field
                name="price_capital"
                component={TextInput}
                label={`Price Capital : ${accounting.formatMoney(
                  formStates && formStates.get('price_capital'),
                  'Rp. ',
                  2,
                )}`}
                type="number"
              />
              <label />
              <Field
                name="sell_price_credit"
                component={TextInput}
                label={`Sell Price Credit : ${accounting.formatMoney(
                  formStates && formStates.get('sell_price_credit'),
                  'Rp. ',
                  2,
                )}`}
                type="number"
              />
              <Field
                name="sell_price_cash"
                component={TextInput}
                label={`Sell Price Cash : ${accounting.formatMoney(
                  formStates && formStates.get('sell_price_cash'),
                  'Rp. ',
                  2,
                )}`}
                type="number"
              />
              <LoadingButton
                name="Edit Product"
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
  const {
    name,
    unit,
    stock,
    price_capital,
    sell_price_credit,
    sell_price_cash,
  } = values.toObject();
  const errors = {};
  if (!name) {
    errors.name = 'Please enter a name';
  }
  if (!unit) {
    errors.unit = 'Please enter a unit';
  }
  if (!stock) {
    errors.stock = 'Please enter a stock';
  }
  if (stock && stock < 0) {
    errors.stock = 'Cannot have negative stock';
  }
  if (!price_capital) {
    errors.price_capital = 'Please enter a price capital';
  }
  if (!sell_price_cash) {
    errors.sell_price_cash = 'Please enter a sell price cash';
  }
  if (!sell_price_credit) {
    errors.sell_price_credit = 'Please enter a sell price credit';
  }

  // errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

const mapStateToProps = (state, ownProps) => ({
  formStates: getFormValues('editproduct')(state),
  initialValues: ownProps.product,
});

const withForm = reduxForm({
  form: 'editproduct',
  enableReinitialize: true,
  validate,
});

const withConnect = connect(
  mapStateToProps,
  { editProduct },
);

export default compose(
  withConnect,
  withForm,
)(ProductEditModal);
