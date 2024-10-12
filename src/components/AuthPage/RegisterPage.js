import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';
import ErrorMessage from '../common/ErrorMessage';
import useForm from '../hooks/useForm'; // Import custom form hook
import './AuthPage.css';

function RegisterPage() {
  const { username, password, handleUsernameChange, handlePasswordChange } = useForm(); // Use shared form logic
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);  // Added loading state
  const navigate = useNavigate();

  const fetchCSRFToken = async () => {
    const response = await axios.get(`${process.env.REACT_APP_USER_API_URL}/csrf-token`, { withCredentials: true });
    return response.data.csrf_token;
  };
  
  const handleRegister = async () => {
    setLoading(true); 
    const csrfToken = await fetchCSRFToken();  // Fetch CSRF token
  
    axios.post(`${process.env.REACT_APP_USER_API_URL}/register`, 
      { username, password }, 
      { headers: { 'X-CSRFToken': csrfToken }, withCredentials: true }  // Include CSRF token in headers
    )
    .then(() => {
      setLoading(false);  
      setMessage('Registration successful! You can now log in.');
      navigate('/login'); 
    })
    .catch(() => {
      setLoading(false);  
      setMessage('Registration failed. User might already exist.');
      handlePasswordChange({ target: { value: '' } }); 
    });
  };
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();  // Trigger registration on pressing Enter
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <div className="auth-form">
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          className="auth-input"
          aria-label="Enter your username"
          onKeyPress={handleKeyPress} // Trigger registration on Enter
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="auth-input"
          aria-label="Enter your password"
          onKeyPress={handleKeyPress} // Trigger registration on Enter
        />
        <Button onClick={handleRegister} label={loading ? 'Registering...' : 'Register'} className="auth-button" disabled={loading} />
        {message && <ErrorMessage message={message} />}
      </div>
    </div>
  );
}

export default RegisterPage;
