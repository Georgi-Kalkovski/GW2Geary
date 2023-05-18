import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [apiKey, setApiKey] = useState("");
  const [apiKeys, setApiKeys] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const fetchApiKeys = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/auth/users/${currentUser.id}/apiKeys`,
            {
              headers: {
                Authorization: `Bearer ${currentUser.accessToken}`,
              },
            }
          );
          setApiKeys(response.data.user.apiKeys);
        } catch (error) {
          console.error("Error retrieving API keys:", error);
        }
      };

      fetchApiKeys();
    }
  }, [currentUser, setApiKeys]);

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleApiKeyCreate = () => {
    const existingApiKey = currentUser.apiKeys.find((key) => key._id === apiKey);
    if (existingApiKey) {
      console.log("API key already exists");
      return;
    }

    const pattern = new RegExp(`^[a-zA-Z0-9-]{72}$`);
    if (pattern.test(apiKey)) {
      console.log("Valid input");

      axios
        .put(
          `http://localhost:3001/api/auth/users/${currentUser.id}/apiKey`,
          { apiKey },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.accessToken}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log("API key created successfully");
            setApiKey("");
            fetchApiKeys();
          } else {
            console.error("Failed to create API key");
            setApiKey("");
            throw new Error(response.data);
          }
        })
        .catch((error) => {
          console.error("Failed to create API key:", error);
        });
    } else {
      console.log("Invalid input");
      setApiKey("");
    }
  };

  const updateApiKeyStatus = (apiKeyId, active) => {
    axios
      .put(
        `http://localhost:3001/api/auth/apiKeys/${apiKeyId}/status`,
        { active },
        {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.data.user && response.data.user.apiKeys) {
          setApiKeys(response.data.user.apiKeys);
        }
      })
      .catch((error) => {
        console.error("Error updating API key status:", error);
      });
  };

  const deleteApiKey = (apiKeyId) => {
    axios
      .delete(`http://localhost:3001/api/auth/apiKeys/${apiKeyId}`, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
      .then((response) => {
        if (response.data.user && response.data.user.apiKeys) {
          setApiKeys(response.data.user.apiKeys);
        }
      })
      .catch((error) => {
        console.error("Error deleting API key:", error);
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
