import { renderHook, act } from '@testing-library/react-hooks';
import useForm from '../components/hooks/useForm';

describe('useForm hook', () => {
  test('should initialize with empty username and password', () => {
    const { result } = renderHook(() => useForm());

    expect(result.current.username).toBe('');
    expect(result.current.password).toBe('');
  });

  test('should update username when handleUsernameChange is called', () => {
    const { result } = renderHook(() => useForm());

    act(() => {
      result.current.handleUsernameChange({ target: { value: 'testuser' } });
    });

    expect(result.current.username).toBe('testuser');
  });

  test('should update password when handlePasswordChange is called', () => {
    const { result } = renderHook(() => useForm());

    act(() => {
      result.current.handlePasswordChange({ target: { value: 'testpass' } });
    });

    expect(result.current.password).toBe('testpass');
  });
});
