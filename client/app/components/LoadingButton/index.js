import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

// recieve loading and click as props
const LoadingButton = ({ name, className, isLoading, click, type }) => {
  if (isLoading) {
    return (
      <button
        className={className}
        disabled
        style={{ position: 'relative', display: 'inline-block' }}
      >
        <div className="pulse-loading">
          <span />
          <span />
          <span />
        </div>
      </button>
    );
  }
  return (
    <button className={className} type={type} onClick={click}>
      {name}
    </button>
  );
};

LoadingButton.defaultProps = {
  click: () => {},
  className: 'button',
  type: 'submit',
};

LoadingButton.propTypes = {
  click: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  type: PropTypes.string,
};

export default LoadingButton;
