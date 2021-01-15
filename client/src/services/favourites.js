import axios from "axios";

const favouriteService = {
  GetAllFavourites: async (userID) => {
    try {
      return await axios.get(`/api/user/${userID}`);
    } catch (error) {
      return error.response;
    }
  },

  AddNewFavourite: async (propertyID, userID) => {
    try {
      return await axios.post("/api/user/favourites/add", {
        propertyID,
        userID,
      });
    } catch (error) {
      return error.response;
    }
  },
};

export default favouriteService;
