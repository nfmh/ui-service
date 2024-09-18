import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/common/Button'

describe('Button Component', () => {
  const mockOnClick = jest.fn();

  test('renders Button with correct label', () => {
    render(<Button label="Click me" onClick={mockOnClick} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick function when button is clicked', () => {
    render(<Button label="Click me" onClick={mockOnClick} />);
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('applies the correct className', () => {
    const className = 'test-button';
    render(<Button label="Click me" onClick={mockOnClick} className={className} />);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('test-button');
  });
});
