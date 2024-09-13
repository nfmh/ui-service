import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Button from './common/Button';
import Input from './common/Input';
import ErrorMessage from './common/ErrorMessage';
import useForm from './hooks/useForm';
import './AuthPage.css';

function LoginPage() {
  const { username, password, handleUsernameChange, handlePasswordChange } = useForm();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);  // Added loading state
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);  // Show loading state
    axios.post(`${process.env.REACT_APP_USER_API_URL}/login`, { username, password })
      .then(res => {
        setLoading(false);  // Remove loading state
        const token = res.data.token;
        if (token) {
          document.cookie = `token=${token}; path=/; secure; HttpOnly; SameSite=Strict`;
          setMessage('Login successful!');
          navigate('/home');
        } else {
          setMessage('Login failed: No token received.');
        }
      })
      .catch(() => {
        setLoading(false);  // Remove loading state
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
          onKeyPress={handleKeyPress}  // Trigger login on Enter
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="auth-input"
          aria-label="Enter your password"
          onKeyPress={handleKeyPress}  // Trigger login on Enter
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
