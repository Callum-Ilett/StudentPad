import axios from "axios";

const userService = {
  AddNewContact: async (userID, contactID) => {
    try {
      return await axios.post(`/api/user/contacts/add`, { userID, contactID });
    } catch (error) {
      return error.response;
    }
  },

  GetCompanyDetailsByEmail: async (email) => {
    try {
      return await axios.get(`/api/user/branch/${email}`);
    } catch (error) {
      return error.response;
    }
  },
};

export default userService;
