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
import ConfirmDialog from 'components/ConfirmDialog';

import { editCustomer, deleteCustomer } from './actions';

class CustomerEditModal extends Component {
  state = {
    loading: false,
  };

  handleFormSubmit = async values => {
    const { editCustomer, onClose, reset, customer } = this.props;
    this.setState({ loading: true });
    try {
      await editCustomer(customer.id, values.toObject(), () => {
        onClose();
        reset();
        this.setState({ loading: false });
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
    const { deleteCustomer, onClose, reset, customer } = this.props;
    this.setState({ loading: true });
    await deleteCustomer(customer.id);
    onClose();
    reset();
    this.setState({ loading: false });
  };

  render() {
    const { onClose, handleSubmit, visible, customer } = this.props;
    return (
      <section>
        <Modal visible={visible} width="60%" height="80%" effect="fadeInUp">
          <div className="d-flex justify-content-between">
            <h2 className="pl-5 pt-3">Edit {customer && customer.name}</h2>
            <Button color="secondary" onClick={() => onClose()}>
              <ClearIcon />
            </Button>
          </div>
          <hr className="m-0" />
          <div className="m-4" style={{ height: '80%', padding: '0 3%' }}>
            <form
              className="add-customer-form"
              onSubmit={handleSubmit(this.handleFormSubmit)}
            >
              <Field
                name="name"
                component={TextInput}
                label="Name"
                type="text"
              />
              <Field
                name="address"
                component={TextInput}
                label="Address"
                type="text"
              />
              <Field
                name="phone"
                component={TextInput}
                label="Phone"
                type="text"
              />
              <div className="d-flex justify-content-between">
                <LoadingButton
                  name="Edit Customer"
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
                      name="Delete Customer"
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
  const { name, address, phone } = values.toObject();
  const errors = {};
  if (!name) {
    errors.name = 'Please enter a name';
  }
  if (!address) {
    errors.address = 'Please enter a address';
  }
  if (!phone) {
    errors.unit = 'Please enter a phone number';
  }

  // errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

const mapStateToProps = (state, ownProps) => ({
  formStates: getFormValues('editcustomer')(state),
  initialValues: ownProps.customer,
});

const withForm = reduxForm({
  form: 'editcustomer',
  enableReinitialize: true,
  validate,
});

const withConnect = connect(
  mapStateToProps,
  { editCustomer, deleteCustomer },
);

export default compose(
  withConnect,
  withForm,
)(CustomerEditModal);
