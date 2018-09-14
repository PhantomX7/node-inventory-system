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

import { addProduct } from './actions';

class ProductAddModal extends Component {
  state = {
    loading: false,
  };

  handleFormSubmit = values => {
    const { addProduct, onClose, reset } = this.props;
    this.setState({ loading: true });
    addProduct(values.toObject(), () => {
      onClose();
      reset();
      this.setState({ loading: false });
    });
  };

  render() {
    const { onClose, handleSubmit, formStates } = this.props;
    return (
      <section>
        <Modal
          visible={this.props.visible}
          width="60%"
          height="80%"
          effect="fadeInUp"
        >
          <div className="d-flex justify-content-between">
            <h2 className="pl-5 pt-3">Add Product</h2>
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
                name="Add Product"
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
    stock,
    unit,
    price_capital,
    sell_price_credit,
    sell_price_cash,
  } = values.toObject();
  const errors = {};
  if (!name) {
    errors.name = 'Please enter a name';
  }
  if (!stock) {
    errors.stock = 'Please enter a stock';
  }
  if (stock && stock < 0) {
    errors.stock = 'Cannot have negative stock';
  }
  if (!unit) {
    errors.unit = 'Please enter a unit';
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

const mapStateToProps = state => ({
  formStates: getFormValues('addproduct')(state),
});

const withForm = reduxForm({
  form: 'addproduct',
  validate,
});

const withConnect = connect(
  mapStateToProps,
  { addProduct },
);

export default compose(
  withForm,
  withConnect,
)(ProductAddModal);
