import React from 'react';
import { render, screen } from '@testing-library/react'; 
import App from '../App.js'; // Adjust path as needed

describe('App Routing', () => {
  test('renders LoginPage by default', () => {
    render(<App />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('renders RegisterPage for /register route', () => {
    render(<App />);
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('renders NotFound for unknown route', () => {
    render(<App />);
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });
});
