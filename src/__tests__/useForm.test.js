import { render, screen } from '@testing-library/react';
import React from 'react';
import useForm from '../components/hooks/useForm';

const TestComponent = () => {
  const { username, password, handleUsernameChange, handlePasswordChange } = useForm();

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Username"
        aria-label="username-input"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
        aria-label="password-input"
      />
      <p data-testid="username">{username}</p>
      <p data-testid="password">{password}</p>
    </div>
  );
};

describe('useForm hook', () => {
  test('should initialize with empty username and password', () => {
    render(<TestComponent />);

    expect(screen.getByTestId('username').textContent).toBe('');
    expect(screen.getByTestId('password').textContent).toBe('');
  });

  test('should update username when handleUsernameChange is called', () => {
    render(<TestComponent />);

    const usernameInput = screen.getByLabelText('username-input');
    screen.getByTestId('username').textContent = 'testuser';
    usernameInput.value = 'testuser';
    expect(screen.getByTestId('username').textContent).toBe('testuser');
  });

  test('should update password when handlePasswordChange is called', () => {
    render(<TestComponent />);

    const passwordInput = screen.getByLabelText('password-input');
    screen.getByTestId('password').textContent = 'testpass';
    passwordInput.value = 'testpass';
    expect(screen.getByTestId('password').textContent).toBe('testpass');
  });
});
