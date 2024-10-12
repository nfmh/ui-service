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
    const csrfToken = await fetchCSRFToken();

    try {
      const response = await axios.post(`${process.env.REACT_APP_USER_API_URL}/login`, 
        { username, password }, 
        { headers: { 'X-CSRFToken': csrfToken }, withCredentials: true }
      );

      if (response.status === 200) {
        setMessage('Login successful!');
        setLoading(false);  // Ensure loading is stopped after login
        // Inside LoginPage.js after login
        console.log('Login successful. Navigating to mood...');
        console.log('Access token set in cookie:', document.cookie);
        navigate('/mood');
        navigate('/mood');  // Redirect to mood page
      } else {
        setLoading(false);
        setMessage('Login failed. Invalid credentials.');
      }
    } catch (error) {
      setLoading(false);
      setMessage('Login failed. Please check your credentials.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
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
