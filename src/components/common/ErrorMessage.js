import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css'; // Import CSS for error message styling

const ErrorMessage = ({ message }) => {
  return <p className="error-message">{message}</p>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired  // Validate message as a required string
};

export default ErrorMessage;
