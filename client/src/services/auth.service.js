import axios from "axios";

const API_URL = "http://localhost:3001/api/auth/";

// User Register Service
const register = (email, password) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
  });
};

// User Login Service
const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
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

// User Get Service
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
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
  getCurrentUser,
  getAllUsers,
  createApiKey,
  getApiKeys,
  updateApiKeyStatus,
  deleteApiKey,
};

export default AuthService;
