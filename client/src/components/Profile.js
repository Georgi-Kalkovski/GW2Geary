import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom';
import fetchData from "./fetchData";
import AuthService from "../services/auth.service";
import axios from "axios";

import Elementalist from './img/Elementalist.png';
import Engineer from './img/Engineer.png';
import Guardian from './img/Guardian.png';
import Mesmer from './img/Mesmer.png';
import Necromancer from './img/Necromancer.png';
import Ranger from './img/Ranger.png';
import Revenant from './img/Revenant.png';
import Thief from './img/Thief.png';
import Warrior from './img/Warrior.png';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [apiKey, setApiKey] = useState("");
  const [apiKeys, setApiKeys] = useState([]);
  const [professions, setProfessions] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const response = await AuthService.getAllUsers();
        setData(response.data.users);
      })();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const professionIcons = {
    Elementalist: Elementalist,
    Engineer: Engineer,
    Guardian: Guardian,
    Mesmer: Mesmer,
    Necromancer: Necromancer,
    Ranger: Ranger,
    Revenant: Revenant,
    Thief: Thief,
    Warrior: Warrior
  };

  useEffect(() => {
    try {
      (async () => {
        setProfessions(await fetchData('professionsAll'));
      })();
    } catch (error) {
      console.error(error);
    }
  }, []);

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


  return (
    <div>
      {currentUser && (
        <div>
          <div className="container">
            <div className="flex center apis-flex">
              <h3>
                <strong>{currentUser.email}</strong> Profile
              </h3>
              <div>
                <label htmlFor="apiKey">Enter a valid API key created from <Link style={{ color: '#b10026' }} to="https://account.arena.net/applications">Guild Wars 2</Link>:</label>
                <input
                  type="text"
                  id="apiKey"
                  size="75"
                  value={apiKey}
                  onChange={handleApiKeyChange}
                />
                <button onClick={handleApiKeyCreate}>Create API Key</button>
                <br /><br />
                Api Keys:
                {/* Apis */}
                {apiKeys &&
                  apiKeys.map((apiKey) => (
                    <div key={apiKey._id}>
                      <span className="yellow-highlight">{apiKey.accountName}</span> - {apiKey._id}{" "}
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

            <br />

            {/* Characters */}
            <div>
              {apiKeys &&
                apiKeys.map((apiKey) => (
                  <>
                    <h2 className="flex center yellow-highlight">{apiKey.accountName}</h2>
                    <div className="home-characters">
                      {apiKey.characters && apiKey.characters.map(character => {
                        const Icon = professionIcons[character.profession];

                        return (
                          <div key={character.name.replace(/\s/g, "_")} className="home-character">
                            <Link to={`/characters/${character.name.replace(/\s/g, "_")}`} className="home-character-link">
                              <div className={`${character.profession.toLowerCase()}-border ${character.profession.toLowerCase()}-lightning-border home-box`} >
                                <div className="acccounts-names"><h3>{character.name}</h3></div>
                                <div>{character.level} {character.race}</div>
                                <img src={Icon} key={character.name} alt={character.name} />
                                <div>{character.profession}</div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;