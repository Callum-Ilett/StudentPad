import axios from "axios";

const favouriteService = {
  GetAllFavourites: async (userID) => {
    try {
      return await axios.get(`/user/${userID}`);
    } catch (error) {
      return error.response;
    }
  },

  AddNewFavourite: async (propertyID, userID) => {
    try {
      return await axios.post("/user/favourites/add", { propertyID, userID });
    } catch (error) {
      return error.response;
    }
  },
};

export default favouriteService;
