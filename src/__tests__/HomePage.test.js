import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import React from 'react';
import axios from 'axios'; // Mock axios
import '@testing-library/jest-dom';

jest.mock('axios');

describe('HomePage', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

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

    expect(screen.getByText('User not authenticated. Please log in.')).toBeInTheDocument();
  });

  test('fetches and displays mood information on button click', async () => {
    // Mock successful axios response for mood info
    axios.post.mockResolvedValueOnce({
      data: {
        quote: 'This is a test quote',
        songs: [{ id: 1, title: 'Test Song', url: 'https://testurl.com' }],
        image_url: 'https://testurl.com/image.jpg',
      },
    });

    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Simulate mood selection
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'happy' } });
    fireEvent.click(screen.getByText('Get Mood Info'));

    // Assert that the mood information is displayed
    expect(await screen.findByText('This is a test quote')).toBeInTheDocument();
    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByAltText('Mood')).toHaveAttribute('src', 'https://testurl.com/image.jpg');
  });

  test('submits new song and shows success message', async () => {
    // Mock successful axios response for song submission
    axios.post.mockResolvedValueOnce({
      status: 201,
      data: { message: 'Added new song' },
    });

    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Simulate selecting a mood
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'happy' } });

    // Simulate entering song title and URL
    fireEvent.change(screen.getByLabelText('Song Title'), { target: { value: 'New Song' } });
    fireEvent.change(screen.getByLabelText('Song URL'), { target: { value: 'https://new-song-url.com' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Would you like to add a song?'));

    // Assert that the correct POST request was made
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_MOOD_API_URL}/song`,
        { mood: 'happy', title: 'New Song', url: 'https://new-song-url.com' },
        expect.any(Object) // We don't need to test the full headers object in this case
      );
    });

    // Assert success message is displayed
    expect(await screen.findByText('New song added successfully.')).toBeInTheDocument();
  });
});
