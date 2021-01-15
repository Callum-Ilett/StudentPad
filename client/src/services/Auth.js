import axios from "axios";

const authService = {
  CheckAuthenticated: async () => {
    try {
      return await axios.get("/api/authentication/status");
    } catch (error) {
      return error.response;
    }
  },

  RegisterUser: async (data) => {
    try {
      return await axios.post("/api/authentication/register", data);
    } catch (error) {
      return error.response;
    }
  },

  Login: async (email, password) => {
    try {
      return await axios.post("/api/authentication/login", { email, password });
    } catch (error) {
      return error.response;
    }
  },

  Logout: async () => {
    try {
      return await axios.get("/api/authentication/logout");
    } catch (error) {
      return error.response;
    }
  },

  GetUserDetails: async (id) => {
    try {
      return await axios.get(`/api/user/${id}`);
    } catch (error) {
      return error.response;
    }
  },
};

export default authService;
