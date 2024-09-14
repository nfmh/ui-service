import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../components/NotFound'

describe('NotFound Component', () => {
  test('renders 404 message and login link', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Go to Login')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/login');
  });
});
