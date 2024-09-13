import React from 'react';
import './Button.css'; // Import CSS for button styling

const Button = ({ onClick, label, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
