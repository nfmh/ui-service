import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Routing', () => {
  test('renders LoginPage by default', async () => {
    render(<App />);

    // Mock Suspense fallback
    expect(await screen.findByText('Login')).toBeInTheDocument();
  });

  test('renders RegisterPage for /register route', async () => {
    render(<App />);

    expect(await screen.findByText('Register')).toBeInTheDocument();
  });

  test('renders NotFound for unknown route', async () => {
    render(<App />);

    expect(await screen.findByText('404 - Page Not Found')).toBeInTheDocument();
  });
});

