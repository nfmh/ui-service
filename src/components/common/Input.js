import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type, placeholder, value, onChange, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,  // Validate type as a required string
  placeholder: PropTypes.string,  // Optional placeholder as a string
  value: PropTypes.string.isRequired,  // Validate value as a required string
  onChange: PropTypes.func.isRequired,  // Validate onChange as a required function
  className: PropTypes.string  // Optional className as a string
};

export default Input;
