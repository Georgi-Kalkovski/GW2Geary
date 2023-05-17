import React, { useState } from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [apiKey, setApiKey] = useState("");

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleApiKeyCreate = () => {
    const existingApiKey = currentUser.apiKeys.find((key) => key._id === apiKey);
    if (existingApiKey) {
      console.log('API key already exists');
      return;
    }
  
    fetch(`http://localhost:3001/api/auth/users/${currentUser.id}/apiKey`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.accessToken}`
      },
      body: JSON.stringify({ apiKey })
    })
      .then(response => {
        if (response.ok) {
          console.log('API key created successfully');
        } else {
          console.error('Failed to create API key');
        }
      })
      .catch(error => {
        console.error('Error creating API key:', error);
      });
  };
  

  return (
    <>
      {currentUser && (
        <div className="flex center">
          <div className="container">
            <header className="jumbotron">
              <h3>
                <strong>{currentUser.email}</strong> Profile
              </h3>
            </header>
            {/* Render other profile information */}
            <div>
              <label htmlFor="apiKey">API Key:</label>
              <input
                type="text"
                id="apiKey"
                value={apiKey}
                onChange={handleApiKeyChange}
              />
              <button onClick={handleApiKeyCreate}>Create API Key</button>
            </div>
            <div>
              {console.log(currentUser.apiKeys)}
              Api Keys:
              {currentUser.apiKeys && currentUser.apiKeys.map(apiKey => (
                <div>
                  {apiKey._id} <input type="checkbox" checked={apiKey.active} />
                </div>
              ))

              }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
