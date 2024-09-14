import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';

describe('HomePage', () => {
  test('renders the mood selector and logout button', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    expect(screen.getByText("What's Your Mood?")).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('displays error message when user is not authenticated', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    // You can mock localStorage or handle it directly for testing
    expect(screen.getByText('User not authenticated. Please log in.')).toBeInTheDocument();
  });
});
