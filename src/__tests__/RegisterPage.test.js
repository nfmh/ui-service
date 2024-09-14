import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterPage from '../components/AuthPage/RegisterPage';

describe('RegisterPage', () => {
  test('renders the registration form correctly', () => {
    render(
      <Router>
        <RegisterPage />
      </Router>
    );

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('displays a success message on successful registration', async () => {
    render(
      <Router>
        <RegisterPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Register'));

    // Mocking an axios response success would require a mock setup, here we are simplifying
    expect(await screen.findByText('Registration successful! You can now log in.')).toBeInTheDocument();
  });
});
