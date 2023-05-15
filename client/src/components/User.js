import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = ({ user }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/user');
        const userData = response.data;
        setUserData(userData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h1>Welcome, {userData.username}!</h1>
          <h2>API Keys:</h2>
          <ul>
            {userData.apikeys.map((apiKey) => (
              <li key={apiKey.id}>
                <strong>API Key:</strong> {apiKey.id} |{' '}
                <strong>Active:</strong> {apiKey.active.toString()}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default User;
