import React, { useState, useEffect, useCallback } from "react";
import EventBus from "../common/EventBus";
import { Link } from 'react-router-dom';
import axios from "axios";
import AuthService from "../services/auth.service";
import { usePopperTooltip } from 'react-popper-tooltip';
import CharacterPreview from "./CharacterPreview";
import upArrow from './up-arrow.svg';
import downArrow from './down-arrow.svg';
import Cog from '../cog.svg'
import Dragon from '../dragon.svg'

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [apiKey, setApiKey] = useState("");
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChangeUsername = useCallback(() => {
    setUsernameError("");
    AuthService.changeUsername(newUsername)
      .then((response) => {
        console.log(response.data.message);

        // Emit an event with the new username
        EventBus.emit("usernameChanged", newUsername);

        // Update the user info in localStorage
        const userInfoJSON = localStorage.getItem("user");
        const userInfo = JSON.parse(userInfoJSON);
        userInfo.username = newUsername;
        const updatedUserInfoJSON = JSON.stringify(userInfo);
        localStorage.setItem("user", updatedUserInfoJSON);
      })
      .catch((error) => {
        console.error("Error changing username:", error);
        setUsernameError("Failed to change username. Please try again.");
      });
  }, [newUsername]);


  const handleChangePassword = useCallback(() => {
    setPasswordError("");
    AuthService.changePassword(newPassword)
      .then((response) => {
        console.log(response.data.message);

        // Emit an event with the password change status
        eventBus.emit("passwordChanged", true);
  
        // Perform any additional actions after successful password change
      })
      .catch((error) => {
        console.error("Error changing password:", error);
        setPasswordError("Failed to change password. Please try again.");
      });
  }, [newPassword]);

  const deleteCurrentUser = useCallback(() => {
    AuthService.deleteCurrentUser()
      .then(() => {
        AuthService.logout();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }, []);

  const handleApiKeyChange = useCallback((e) => {
    setApiKey(e.target.value);
  }, []);

  const handleApiKeyCreate = useCallback(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error creating or retrieving API keys:", error);
        setLoading(false);
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
      .then(() => {
        // Remove the deleted API key from the state
        setApiKeys(apiKeys.filter((apiKey) => apiKey._id !== apiKeyId));
      })
      .catch((error) => {
        console.error("Error deleting API key:", error);
      });
  }, [apiKeys]);

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
    return axios
      .put(
        `http://localhost:3001/api/auth/users/${userId}/apiKey`,
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
          console.log("API key created successfully");
          setApiKey("");
          return response.data;
        } else {
          console.error("Failed to create API key");
          setApiKey("");
          throw new Error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Failed to create API key", error);
        throw new Error("Failed to create API key");
      });
  };

  const [expandedIndices, setExpandedIndices] = useState([]);

  const toggleExpansion = (index) => {
    if (isExpanded(index)) {
      setExpandedIndices(expandedIndices.filter((i) => i !== index));
    } else {
      setExpandedIndices([...expandedIndices, index]);
    }
  };

  const isExpanded = (index) => expandedIndices.includes(index);

  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({ placement: 'top' });

  return (
    <div>
      {currentUser && (
        <div>
          <div className="flex apis-flex">
            {/* Change Username */}
          <div>
            <label htmlFor="newUsername">New Username:</label>
            <input
              type="text"
              id="newUsername"
              className="form-control"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            {usernameError && <div className="error">{usernameError}</div>}
            <button onClick={handleChangeUsername} className="basic-button">
              Change Username
            </button>
          </div>

          {/* Change Password */}
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {passwordError && <div className="error">{passwordError}</div>}
            <button onClick={handleChangePassword} className="basic-button">
              Change Password
            </button>
          </div>
          {/* Delete User */}
          <button onClick={deleteCurrentUser} className="basic-button">
            Delete User
          </button>
          </div>

          <div className="container" key="profile-container">
            <div className="flex center apis-flex" key="apis-flex">
              <div key="api-key-section">
                <label htmlFor="apiKey">Enter a valid API key created from <Link style={{ color: '#aa0404' }} to="https://account.arena.net/applications">Guild Wars 2</Link>:</label>
                <input
                  type="text"
                  id="apiKey"
                  size="75"
                  className="form-control"
                  placeholder="Add API Key here..."
                  value={apiKey}
                  onChange={handleApiKeyChange}
                  key="api-key-input"
                />
                <button className="basic-button" onClick={handleApiKeyCreate} key="add-api-key-button">Add API Key</button>
                <br /><br />

                {/* Loader */}
                {loading &&
                  <div className="flex center">
                    <div className="logo-loading-div">
                      <img src={Dragon} alt="" className="logo--loading-dragon" />
                      <img src={Cog} alt="" className="logo-loading-cog" />
                    </div>
                  </div>}

                {/* Apis */}
                {apiKeys &&
                  apiKeys.map((apiKey) => (
                    <div key={apiKey._id} >
                      <div className="yellow-highlight flex center" key={`api-key-account-${apiKey._id}`}>{apiKey.accountName}</div>
                      <div className="facts-div" key={`api-key-details-${apiKey._id}`}>{apiKey._id}{" "}

                        {/* Checkbox */}
                        <label className="custom-checkbox"
                          ref={setTriggerRef}>
                          <input
                            type="checkbox"
                            className="api-checkbox "
                            defaultChecked={apiKey.active}
                            onChange={(e) => updateApiKeyStatus(apiKey._id, e.target.checked)}
                            key={`api-key-checkbox-${apiKey._id}`}
                          />
                          <span className="checkmark"></span>
                        </label>
                        {visible && (
                          <div
                            ref={setTooltipRef}
                            {...getTooltipProps({ className: 'tooltip-container attribute-popup' })}
                          >
                            <div style={{ fontSize: '14px' }}>
                              <span style={{ color: 'darkgreen' }}>Check</span>
                              /<span style={{ color: '#aa0404' }}>Uncheck</span> the checkbox to
                              <span style={{ color: 'darkgreen' }}> Show</span>
                              /<span style={{ color: '#aa0404' }}>Hide </span>
                              accounts & characters
                            </div>
                            <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                          </div>
                        )}

                        {/* Delete Key */}
                        <button onClick={() => deleteApiKey(apiKey._id)} className="basic-button" key={`api-key-delete-button-${apiKey._id}`}>
                          Delete Key
                        </button>
                      </div>
                      <br key={`api-key-break-${apiKey._id}`} />
                    </div>
                  ))}
              </div>
            </div>

            {/* Characters */}
            <div key="characters-section">
              {apiKeys &&
                apiKeys.map((apiKey, index) => (
                  <React.Fragment key={`characters-fragment-${index}`}>
                    <br key={`characters-break-${index}`} />
                    <div className="flex center font-size-25px" key={`account-name-${index}`}>
                      {apiKey.accountName}
                    </div>
                    <div className="arrow-line" onClick={() => toggleExpansion(index)} key={`character-arrow-line-${index}`}>
                      <div className="flex center">
                        <div className="profile-line"></div>{isExpanded(index) ? <img src={upArrow} alt="up-arrow" /> : <img src={downArrow} alt="down-arrow" />}
                      </div>
                    </div>
                    {isExpanded(index) && (
                      <div className="characters" key={`character-preview-${index}`}>
                        {apiKey.characters &&
                          apiKey.characters.map((character, characterIndex) => (
                            <CharacterPreview
                              character={character}
                              key={`${character.name}-${characterIndex}`}
                            />
                          ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default Profile;