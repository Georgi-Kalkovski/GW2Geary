import axios from "axios";
const ip = 'http://localhost:3001/api';
const API_URL = `${ip}/auth/`;

// User Register Service
const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  });
};

// User Login Service
const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// User Logout Service
const logout = () => {
  localStorage.removeItem("user");
};

// Change Username Service
const changeUsername = (newUsername) => {
  const currentUser = getCurrentUser();
  return axios.put(
    API_URL + `users/${currentUser.id}/username`,
    { newUsername }
  );
};

// Change Email Service
const changeEmail = (newEmail) => {
  const currentUser = getCurrentUser();
  return axios.put(
    API_URL + `users/${currentUser.id}/email`,
    { newEmail }
  );
};

// Change Password Service
const changePassword = (newPassword) => {
  const currentUser = getCurrentUser();
  return axios.put(
    API_URL + `users/${currentUser.id}/password`,
    { newPassword }
  );
};

// User Delete Service
const deleteCurrentUser = () => {
  const currentUser = getCurrentUser();
  return axios.delete(API_URL + `users/${currentUser.id}`, {
    headers: {
      Authorization: `Bearer ${currentUser.accessToken}`,
    },
  });
};

// User Get Service
const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};

// Get User
const getUser = async () => {
  try {
    const currentUser = getCurrentUser();
    let name = currentUser.username;
    let accessToken = currentUser.accessToken;
    const response = await axios.get(`${API_URL}getUser`,
      { params: { name, accessToken } }, {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error
  }
};

// Users Get Service
const getAllUsers = () => {
  return axios.get(API_URL + "allUsers");
};

// Users Get Account
const getAccount = (name) => {
  return axios.get(API_URL + "getAccount", { params: { name } });
};

// Users Get Character
const getCharacter = (name) => {
  return axios.get(API_URL + "getCharacter", { params: { name } });
};

// Email Get Service
const getEmail = (email) => {
  return axios.post(API_URL + "getEmail",
    { email }
  );
};

// Api Create Service
const createApiKey = (apiKey) => {
  const currentUser = getCurrentUser();
  return axios.put(API_URL + `users/${currentUser.id}/apiKey`, { apiKey }, {
    headers: {
      'Authorization': `Bearer ${currentUser.accessToken}`,
    },
  });
};

// Apis Get Service
const getApiKeys = () => {
  const currentUser = getCurrentUser();
  return axios.get(API_URL + `users/${currentUser.id}/apiKeys`, {
    headers: {
      'Authorization': `Bearer ${currentUser.accessToken}`,
    },
  });
};

// Api Update Service
const updateApiKeyStatus = (apiKeyId, active) => {
  const currentUser = getCurrentUser();
  return axios.put(
    API_URL + `users/${currentUser.id}/apiKeys/${apiKeyId}`,
    { active },
    {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    }
  );
};

// API Delete Service
const deleteApiKey = (apiKeyId) => {
  const currentUser = getCurrentUser();
  return axios.delete(API_URL + `users/${currentUser.id}/apiKeys/${apiKeyId}`, {
    headers: {
      'Authorization': `Bearer ${currentUser.accessToken}`,
    },
  });
};

// Api Update Service
const updateCharacterStatus = (apiKeyId, characterId, active) => {
  const currentUser = getCurrentUser();
  return axios.put(
    API_URL + `users/${currentUser.id}/apiKeys/${apiKeyId}/characters/${characterId}`,
    { active },
    {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    }
  );
};

// Set Build Service
const setBuild = async (name) => {
  try {
    const currentUser = getCurrentUser();
    const { id: userId, accessToken } = currentUser;

    const response = await axios.put(
      `${API_URL}users/c/${name}`,
      {
        owner: userId,
        name,
        profession,
        spec,
        skills,
        aquatic_skills,
        specializations,
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error setting build:', error);
    throw error;
  }
};

// Get Build Service
const getBuild = (name, id) => {
  return axios.get(API_URL + `users/blds/${name.replaceAll('_', ' ')}/${id}`);
};

// Delete Stored Build Service
const deleteBuild = async (storedBuildId) => {
  const currentUser = getCurrentUser();
  try {
    const response = await axios.delete(API_URL + `/storedBuilds/${storedBuildId}`, {
      headers: {
        'Authorization': `Bearer ${currentUser.accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error deleting stored build');
  }
};

// Set Fashion Service
const setFashion = async (name) => {
  try {
    const currentUser = getCurrentUser();
    const { id: userId, accessToken } = currentUser;

    const modifiedEquipment = {
      id: equipment.id,
      skin: equipment.skin,
      dyes: equipment.dyes,
      infusions: equipment.infusions
    };

    const response = await axios.put(
      `${API_URL}users/c/${name}`,
      {
        owner: userId,
        name,
        gender,
        race,
        profession,
        equipment: modifiedEquipment
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error setting build:', error);
    throw error;
  }
};

// Get Fashion Service
const getFashion = (name, id) => {
  return axios.get(API_URL + `users/fs/${name.replaceAll('_', ' ')}/${id}`);
};

// Delete Stored Build Service
const deleteFashion = async (storedFashionId) => {
  const currentUser = getCurrentUser();
  try {
    const response = await axios.delete(API_URL + `/storedFashion/${storedFashionId}`, {
      headers: {
        'Authorization': `Bearer ${currentUser.accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error deleting stored fashion');
  }
};

// Set Equipment Service
const setEquipment = async (name) => {
  try {
    const currentUser = getCurrentUser();
    const { id: userId, accessToken } = currentUser;

    const modifiedEquipment = {
      id: equipment.id,
      skin: equipment.skin,
      dyes: equipment.dyes,
      infusions: equipment.infusions,
      upgrades: equipment.upgrades,
      stats: equipment.stats
    };

    const response = await axios.put(
      `${API_URL}users/c/${name}`,
      {
        owner: userId,
        name,
        gender,
        race,
        profession,
        relic,
        powerCore,
        equipment: modifiedEquipment
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error setting build:', error);
    throw error;
  }
};

// Get Equipment Service
const getEquipment = (name, id) => {
  return axios.get(API_URL + `users/eqs/${name.replaceAll('_', ' ')}/${id}`);
};

// Delete Equipment Build Service
const deleteEquipment = async (storedEquipmentId) => {
  const currentUser = getCurrentUser();
  try {
    const response = await axios.delete(API_URL + `/storedEquipment/${storedEquipmentId}`, {
      headers: {
        'Authorization': `Bearer ${currentUser.accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error deleting stored equipment');
  }
};

const AuthService = {
  register,
  login,
  logout,
  changeUsername,
  changePassword,
  deleteCurrentUser,
  getCurrentUser,
  getAllUsers,
  getAccount,
  getCharacter,
  getEmail,
  changeEmail,
  createApiKey,
  getApiKeys,
  updateApiKeyStatus,
  deleteApiKey,
  updateCharacterStatus,
  getUser,
  setBuild,
  getBuild,
  deleteBuild,
  setFashion,
  getFashion,
  deleteFashion,
  setEquipment,
  getEquipment,
  deleteEquipment,
};

export default AuthService;
