import axios from "axios";

const API_URL = "http://localhost:3001/api/auth/";

// User Register Service
const register = (username, password) => {
  return axios.post(API_URL + "register", {
    username,
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

// Users Get Service
const getAllUsers = () => {
  return axios.get(API_URL + "allUsers");
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

const AuthService = {
  register,
  login,
  logout,
  changeUsername,
  changePassword,
  deleteCurrentUser,
  getCurrentUser,
  getAllUsers,
  createApiKey,
  getApiKeys,
  updateApiKeyStatus,
  deleteApiKey,
};

export default AuthService;
