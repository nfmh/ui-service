import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import LoginPage from '../components/AuthPage/LoginPage';
import axios from 'axios'; // Mock axios
jest.mock('axios');

describe('LoginPage', () => {
  test('renders the login form correctly', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('displays an error message on failed login', async () => {
    // Mock failed axios response
    axios.post.mockRejectedValueOnce({});

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('Login'));

    expect(await screen.findByText('Login failed. Please check your credentials.')).toBeInTheDocument();
  });
});
