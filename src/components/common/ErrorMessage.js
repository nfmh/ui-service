import React from 'react';
import './ErrorMessage.css'; // Import CSS for error message styling

const ErrorMessage = ({ message }) => {
  return <p className="error-message">{message}</p>;
};

export default ErrorMessage;
