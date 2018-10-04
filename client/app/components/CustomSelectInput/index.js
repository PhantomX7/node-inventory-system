/**
 *
 * TextInput
 *
 */

import React from 'react';
import TextField from '@material-ui/core/TextField';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const TextInput = ({
  input,
  label,
  type,
  meta: { touched, error },
  ...othersProps
}) => {
  const className = `${
    touched && error ? 'd-flex justify-content-start text-danger' : ''
  }`;
  return (
    <div className="w-100 my-3">
      <TextField
        label={label}
        color="primary"
        id={label}
        type={type}
        error={touched && Boolean(error)}
        fullWidth
        {...input}
        {...othersProps}
      />
      <small className={className}>{touched && error}</small>
    </div>
  );
};

TextInput.propTypes = {};

export default TextInput;
