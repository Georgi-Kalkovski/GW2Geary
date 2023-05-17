import axios from "axios";

const API_URL = "http://localhost:3001/api/auth/";

const register = (email, password) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
  });
};

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

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const createApiKey = (apiKey) => {
  const currentUser = getCurrentUser();
  return axios.put(API_URL + `users/${currentUser.id}/apiKey`, { apiKey }, {
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
  createApiKey,
};

export default AuthService;
