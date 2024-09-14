import { render, screen } from '@testing-library/react';
import ErrorMessage from '../components/common/ErrorMessage';

describe('ErrorMessage Component', () => {
  test('renders ErrorMessage with correct message', () => {
    render(<ErrorMessage message="This is an error!" />);
    expect(screen.getByText('This is an error!')).toBeInTheDocument();
  });

  test('applies the correct className', () => {
    render(<ErrorMessage message="This is an error!" />);
    const message = screen.getByText('This is an error!');
    expect(message).toHaveClass('error-message');
  });
});
