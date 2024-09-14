// import { render, screen } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import HomePage from '../components/HomePage/HomePage';
// import axios from 'axios'; // Mock axios
// import '@testing-library/jest-dom';

// jest.mock('axios');

// describe('HomePage', () => {
//   beforeEach(() => {
//     localStorage.clear(); // Clear localStorage before each test
//   });

//   test('renders the mood selector and logout button', () => {
//     render(
//       <Router>
//         <HomePage />
//       </Router>
//     );

//     expect(screen.getByText("What's Your Mood?")).toBeInTheDocument();
//     expect(screen.getByText('Logout')).toBeInTheDocument();
//   });

//   test('displays error message when user is not authenticated', () => {
//     render(
//       <Router>
//         <HomePage />
//       </Router>
//     );

//     expect(screen.getByText('User not authenticated. Please log in.')).toBeInTheDocument();
//   });

//   test('fetches and displays mood information on button click', async () => {
//     // Mock successful axios response
//     axios.post.mockResolvedValueOnce({
//       data: {
//         quote: 'This is a test quote',
//         songs: [{ id: 1, title: 'Test Song', url: 'https://testurl.com' }],
//         image_url: 'https://testurl.com/image.jpg',
//       },
//     });

//     render(
//       <Router>
//         <HomePage />
//       </Router>
//     );

//     // Simulate mood selection
//     fireEvent.change(screen.getByRole('combobox'), { target: { value: 'happy' } });
//     fireEvent.click(screen.getByText('Get Mood Info'));

//     expect(await screen.findByText('This is a test quote')).toBeInTheDocument();
//     expect(screen.getByText('Test Song')).toBeInTheDocument();
//     expect(screen.getByAltText('Mood')).toHaveAttribute('src', 'https://testurl.com/image.jpg');
//   });
// });
