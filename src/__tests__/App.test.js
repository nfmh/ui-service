import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import App from '../App';

describe('App Routing', () => {
  test('renders LoginPage by default', async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Mock Suspense fallback
    expect(await screen.findByText('Login')).toBeInTheDocument();
  });

  test('renders RegisterPage for /register route', async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    expect(await screen.findByText('Register')).toBeInTheDocument();
  });

  test('renders NotFound for unknown route', async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    expect(await screen.findByText('404 - Page Not Found')).toBeInTheDocument();
  });
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

describe('App Routing', () => {
  test('renders LoginPage by default', async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Mock Suspense fallback
    expect(await screen.findByText('Login')).toBeInTheDocument();
  });

  test('renders RegisterPage for /register route', async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    expect(await screen.findByText('Register')).toBeInTheDocument();
  });

  test('renders NotFound for unknown route', async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    expect(await screen.findByText('404 - Page Not Found')).toBeInTheDocument();
  });
});
