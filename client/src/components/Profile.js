import React, { useState, useEffect, useCallback } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [apiKey, setApiKey] = useState("");
  const [apiKeys, setApiKeys] = useState([]);

  const handleApiKeyChange = useCallback((e) => {
    setApiKey(e.target.value);
  }, []);

  const handleApiKeyCreate = useCallback(() => {
    const existingApiKey = currentUser.apiKeys.find((key) => key._id === apiKey);
    if (existingApiKey) {
      console.log("API key already exists");
      return;
    }

    const pattern = new RegExp(`^[a-zA-Z0-9-]{72}$`);
    if (pattern.test(apiKey)) {
      console.log('Valid input');
    } else {
      console.log('Invalid input');
      setApiKey("");
      return;
    }

    createApiKey(currentUser.id, currentUser.accessToken, apiKey)
      .then(() => fetchApiKeys(currentUser.id, currentUser.accessToken))
      .then((data) => {
        setApiKeys(data.user.apiKeys);
      })
      .catch((error) => {
        console.error("Error creating or retrieving API keys:", error);
      });
  }, [apiKey, currentUser]);

  const updateApiKeyStatus = useCallback((apiKeyId, active) => {
    AuthService.updateApiKeyStatus(apiKeyId, active)
      .then((response) => {
        if (response.user && response.user.apiKeys) {
          setApiKeys(response.user.apiKeys);
        }
      })
      .catch((error) => {
        console.error("Error updating API key status:", error);
      });
  }, []);

  const deleteApiKey = useCallback((apiKeyId) => {
    AuthService.deleteApiKey(apiKeyId)
      .then((response) => {
        if (response.user && response.user.apiKeys) {
          setApiKeys(response.user.apiKeys);
        }
      })
      .catch((error) => {
        console.error("Error deleting API key:", error);
      });
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchApiKeys(currentUser.id, currentUser.accessToken)
        .then((data) => {
          setApiKeys(data.user.apiKeys);
        })
        .catch((error) => {
          console.error("Error retrieving API keys:", error);
        });
    }
  }, []);

  const fetchApiKeys = (userId, accessToken) => {
    return axios.get(`http://localhost:3001/api/auth/users/${userId}/apiKeys`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error("Failed to retrieve API keys");
      });
  };

  const createApiKey = (userId, accessToken, apiKey) => {
    return axios.put(`http://localhost:3001/api/auth/users/${userId}/apiKey`, { apiKey }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("API key created successfully");
          setApiKey("");
          return response.data;
        } else {
          console.error("Failed to create API key");
          setApiKey("");
          throw new Error(response.data);
        }
      })
      .catch((error) => {
        throw new Error("Failed to create API key");
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
              Api Keys:
              {apiKeys &&
                apiKeys.map((apiKey) => (
                  <div key={apiKey._id}>
                    {apiKey._id}{" "}
                    <input
                      type="checkbox"
                      defaultChecked={apiKey.active}
                      onChange={(e) =>
                        updateApiKeyStatus(apiKey._id, e.target.checked)
                      }
                    />
                    <button onClick={() => deleteApiKey(apiKey._id)}>
                      Delete
                    </button>
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