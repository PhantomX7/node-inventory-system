import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Input from '@material-ui/core/Input';

export default ({
  input,
  label,
  meta: { touched, error },
  children,
  ...othersProps
}) => {
  const className = `${
    touched && error ? 'd-flex justify-content-start text-danger' : ''
  }`;
  return (
    <FormControl className="w-100 mt-3">
      <InputLabel>{label}</InputLabel>
      <Select
        // displayEmpty
        id={label}
        color="primary"
        error={touched && Boolean(error)}
        fullWidth
        {...input}
        {...othersProps}
      >
        {children}
      </Select>
      <small className={className}>{touched && error}</small>
    </FormControl>
  );
};
