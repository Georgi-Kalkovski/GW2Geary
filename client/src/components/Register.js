import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    axios
      .post('http://localhost:3001/api/register', { username, password })
      .then((response) => {
        setMessage(response.data.message);
        login(username, password); // Login user
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          setMessage(error.response.data.error);
        } else {
          console.error('Error:', error);
          setMessage('Error registering user');
        }
      });
  };

  const login = (username, password) => {
    axios
      .post('http://localhost:3001/api/login', { username, password })
      .then((response) => {
        const { token } = response.data;
        // Store the authentication token in local storage
        localStorage.setItem('token', token);
        navigate('/'); // Redirect to home page
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('Error logging in user');
      });
  };

  return (
    <div className="center-container">
      <div className="register-box">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <p>{message}</p>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
