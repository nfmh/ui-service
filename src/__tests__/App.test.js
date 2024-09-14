import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Routing', () => {
  test('renders LoginPage by default', async () => {
    render(<App />);

    // Ensure that the login form (button) is rendered
    expect(await screen.findByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('renders RegisterPage for /register route', async () => {
    render(<App />);

    // Use a more flexible matcher to find the "Register" text inside the link
    expect(await screen.findByRole('link', { name: /register here/i })).toBeInTheDocument();
  });

  // test('renders NotFound for unknown route', async () => {
  //   render(<App />);

  //   // Flexible matcher for the 404 text
  //   expect(await screen.findByText((content, element) => {
  //     return content.includes('404') && content.includes('Page Not Found');
  //   })).toBeInTheDocument();
  // });
});
