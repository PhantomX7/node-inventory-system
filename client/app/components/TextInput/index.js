/**
 *
 * TextInput
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const TextInput = ({
  input,
  label,
  type,
  meta: { touched, error },
  additionalLabel,
  description,
  ...othersProps
}) => {
  const className = `${touched && error ? 'invalid-feedback' : ''}`;
  return (
    <div className="form-group">
      <label htmlFor={label}>
        {label} {additionalLabel}
      </label>
      <input
        id={label}
        type={type}
        className={`form-control ${touched && error ? 'is-invalid' : ''}`}
        {...input}
        {...othersProps}
      />
      {description}
      <div className={className}>{touched ? error : ''}</div>
    </div>
  );
};

TextInput.propTypes = {};

export default TextInput;
