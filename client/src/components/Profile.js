import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [apiKey, setApiKey] = useState("");
  const [apiKeys, setApiKeys] = useState([]);

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  // Create
  const handleApiKeyCreate = () => {
    const existingApiKey = currentUser.apiKeys.find((key) => key._id === apiKey);
    if (existingApiKey) {
      console.log("API key already exists");
      return;
    }
    console.log(apiKey)

    const pattern = new RegExp(`^[a-zA-Z0-9-]{72}$`);
    if (pattern.test(apiKey)) {
      console.log('Valid input');
    } else {
      console.log('Invalid input');
      setApiKey("");
      return;
    }

    fetch(`http://localhost:3001/api/auth/users/${currentUser.id}/apiKey`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify({ apiKey }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("API key created successfully");
          setApiKey("");
          return response.json();
        } else {
          console.error("Failed to create API key");
          setApiKey("");
          return response.json();
        }
      })
      .then((data) => {
        return fetch(
          `http://localhost:3001/api/auth/users/${currentUser.id}/apiKeys`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.accessToken}`,
            },
          }
        );
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to retrieve API keys");
        }
      })
      .then((data) => {
        setApiKeys(data.user.apiKeys);
      })
      .catch((error) => {
        console.error("Error creating or retrieving API keys:", error);
      });
  };

  // Update
  const updateApiKeyStatus = (apiKeyId, active) => {
    AuthService.updateApiKeyStatus(apiKeyId, active)
      .then((response) => {
        if (response.user && response.user.apiKeys) {
          setApiKeys(response.user.apiKeys);
        }
      })
      .catch((error) => {
        console.error("Error updating API key status:", error);
      });
  };

  // Delete
  const deleteApiKey = (apiKeyId) => {
    AuthService.deleteApiKey(apiKeyId)
      .then((response) => {
        if (response.user && response.user.apiKeys) {
          setApiKeys(response.user.apiKeys);
        }
      })
      .catch((error) => {
        console.error("Error deleting API key:", error);
      });
  };

  useEffect(() => {
    if (currentUser) {
      fetch(`http://localhost:3001/api/auth/users/${currentUser.id}/apiKeys`, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to retrieve API keys");
          }
        })
        .then((data) => {
          setApiKeys(data.user.apiKeys);
        })
        .catch((error) => {
          console.error("Error retrieving API keys:", error);
        });
    }
  }, [currentUser]);

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
              Api Keys:
              {apiKeys &&
                apiKeys.map((apiKey) => (
                  <div key={apiKey._id}>
                    {apiKey._id}{" "}
                    <input
                      type="checkbox"
                      defaultChecked={apiKey.active}
                      onChange={(e) => updateApiKeyStatus(apiKey._id, e.target.checked)}
                    />
                    <button onClick={() => deleteApiKey(apiKey._id)}>Delete</button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
