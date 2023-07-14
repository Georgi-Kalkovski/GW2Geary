import React, { useState, useCallback } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Dragon from '../../../dragon.svg';
import Cog from '../../../cog.svg';

function ProfileApiCreate({ currentUser, fetchApiKeys, setApiKeys }) {
  const ip = 'http://localhost:3001/api';
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(null);
  const handleApiKeyChange = useCallback((e) => {
    setApiKey(e.target.value);
  }, []);


  const handleApiKeyCreate = useCallback(() => {
    setLoading(true);
    const existingApiKey = currentUser.apiKeys.find((key) => key._id === apiKey);
    if (existingApiKey) {
      setText('API key already exists');
      setLoading(false);
      return;
    }

    const pattern = new RegExp(`^[a-zA-Z0-9-]{72}$`);
    if (!pattern.test(apiKey)) {
      setText('Invalid input');
      setApiKey("");
      setLoading(false);
      return;
    }

    createApiKey(currentUser.id, currentUser.accessToken, apiKey)
      .then(() => fetchApiKeys(currentUser.id, currentUser.accessToken))
      .then((data) => {
        setApiKeys(data.user.apiKeys);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error creating or retrieving API keys:", error);
        setLoading(false);
      });
  }, [apiKey, currentUser]);

  const createApiKey = (userId, accessToken, apiKey) => {
    return axios
      .put(
        `${ip}/auth/users/${userId}/apiKey`,
        { apiKey },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          setText('API key created successfully');
          setApiKey("");
          return response.data;
        } else {
          setText('Failed to create API key');
          setApiKey("");
        }
      })
      .catch((error) => {
        setText('Failed to create API key');
      });
  };


  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleApiKeyCreate();
      }
    },
    [handleApiKeyCreate]
  );
  return (
    <div className="api-info-field">
      <label htmlFor="apiKey">
        Enter a valid API key created from{" "}
        <Link style={{ color: '#d70000' }} to="https://account.arena.net/applications" target="_blank">
          Guild Wars 2
        </Link>
        :
      </label>
      <input
        type="text"
        id="apiKey"
        size="75"
        className="form-control api-form-control"
        placeholder="Add API Key here..."
        value={apiKey}
        onChange={handleApiKeyChange}
        key="api-key-input"
        onKeyDown={handleKeyPress}
      />
      <button className="basic-button add-api-key-button" onClick={handleApiKeyCreate} key="add-api-key-button">
        Add API Key
      </button>
      <br /><br />
      {text !== null
        ? <span>{text}</span>
        : ''
      }
      {/* Loader */}
      {loading && (
        <div className="flex center">
          <div className="logo-loading-div">
            <img src={Dragon} alt="" className="logo--loading-dragon" />
            <img src={Cog} alt="" className="logo-loading-cog" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileApiCreate;
