import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => {
  return <p className="error-message">{message}</p>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired  // Validate message as a required string
};

export default ErrorMessage;
