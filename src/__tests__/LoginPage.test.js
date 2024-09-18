import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import LoginPage from '../components/AuthPage/LoginPage';
import React from 'react';
import axios from 'axios'; // Mock axios
jest.mock('axios');

describe('LoginPage', () => {
  test('renders the login form correctly', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    // Check if username and password input fields are present
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

    // Check if the login button is present using `getByRole`
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('displays an error message on failed login', async () => {
    // Mock failed axios response
    axios.post.mockRejectedValueOnce({});

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    // Simulate typing into the input fields
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });

    // Click the login button
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Expect the error message to appear
    expect(await screen.findByText('Login failed. Please check your credentials.')).toBeInTheDocument();
  });
});
