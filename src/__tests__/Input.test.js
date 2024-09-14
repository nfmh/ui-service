import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../components/common/Input';

describe('Input Component', () => {
  const mockOnChange = jest.fn();

  test('renders Input with correct type and placeholder', () => {
    render(<Input type="text" placeholder="Enter text" value="" onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveAttribute('type', 'text');
  });

  test('calls onChange function when value changes', () => {
    render(<Input type="text" placeholder="Enter text" value="" onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText('Enter text');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test('renders with the correct value', () => {
    render(<Input type="text" placeholder="Enter text" value="initial value" onChange={mockOnChange} />);
    const input = screen.getByDisplayValue('initial value');
    expect(input).toBeInTheDocument();
  });

  test('applies the correct className', () => {
    render(<Input type="text" placeholder="Enter text" value="" onChange={mockOnChange} className="test-input" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveClass('test-input');
  });
});
