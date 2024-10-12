import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';
import ErrorMessage from '../common/ErrorMessage';
import useForm from '../hooks/useForm';
import './AuthPage.css';

function LoginPage() {
  const { username, password, handleUsernameChange, handlePasswordChange } = useForm();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCSRFToken = async () => {
    const response = await axios.get(`${process.env.REACT_APP_USER_API_URL}/csrf-token`, { withCredentials: true });
    return response.data.csrf_token;
  };

  const handleLogin = async () => {
    setLoading(true);
    const csrfToken = await fetchCSRFToken();  // Fetch CSRF token

    axios.post(`${process.env.REACT_APP_USER_API_URL}/login`, 
      { username, password }, 
      { headers: { 'X-CSRFToken': csrfToken }, withCredentials: true }  // Include CSRF token in headers
    )
    .then(() => {
      setLoading(false);
      setMessage('Login successful!');
      navigate('/mood');  // Redirect to home page
    })
    .catch(() => {
      setLoading(false);
      setMessage('Login failed. Please check your credentials.');
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();  // Submit on pressing Enter
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <div className="auth-form">
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          className="auth-input"
          aria-label="Enter your username"
          onKeyPress={handleKeyPress}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="auth-input"
          aria-label="Enter your password"
          onKeyPress={handleKeyPress}
        />
        <Button onClick={handleLogin} label={loading ? 'Logging in...' : 'Login'} className="auth-button" disabled={loading} />
        {message && <ErrorMessage message={message} />}
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
