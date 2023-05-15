import { useState } from 'react';
import axios from 'axios';

function Login({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLoginSubmit = () => {
    axios
      .post('http://localhost:3001/api/login', { username, password })
      .then((response) => {
        setMessage(response.data.message);
        handleLogin();
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Login</h1>
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
      <button onClick={handleLoginSubmit}>Login</button>
      <p>{message}</p>
    </div>
  );
}

export default Login;
