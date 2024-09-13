import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Import CSS for button styling

const Button = ({ onClick, label, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,  // Validate onClick as a required function
  label: PropTypes.string.isRequired,  // Validate label as a required string
  className: PropTypes.string  // Optional className as a string
};

export default Button;
