import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterPage from '../components/AuthPage/RegisterPage';
import axios from 'axios'; // Mock axios
import '@testing-library/jest-dom';
import React from 'react';

jest.mock('axios');

describe('RegisterPage', () => {
  test('renders the registration form correctly', () => {
    render(
      <Router>
        <RegisterPage />
      </Router>
    );

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('displays a success message on successful registration', async () => {
    // Mock CSRF and successful axios response
    axios.get.mockResolvedValueOnce({ data: { csrf_token: 'mock-csrf-token' } });
    axios.post.mockResolvedValueOnce({});

    render(
      <Router>
        <RegisterPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Wait for success message
    expect(await screen.findByText('Registration successful! You can now log in.')).toBeInTheDocument();
  });

  test('displays an error message on failed registration', async () => {
    // Mock failed axios response
    axios.get.mockResolvedValueOnce({ data: { csrf_token: 'mock-csrf-token' } });
    axios.post.mockRejectedValueOnce({});

    render(
      <Router>
        <RegisterPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'existinguser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Expect error message to appear
    expect(await screen.findByText('Registration failed. User might already exist.')).toBeInTheDocument();
  });
});
