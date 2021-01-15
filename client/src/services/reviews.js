import axios from "axios";

const reviewService = {
  GetAllReviews: async (propertyID) => {
    try {
      return await axios.get(`/api/property/${propertyID}/reviews`);
    } catch (error) {
      return error.response;
    }
  },

  GetUsersReviews: async (userID) => {
    try {
      return await axios.get(`/api/user/${userID}/reviews`);
    } catch (error) {
      return error.response;
    }
  },

  AddNewReview: async (reviewData) => {
    try {
      return await axios.post("/api/property/reviews/add", reviewData);
    } catch (error) {
      return error.response;
    }
  },
};

export default reviewService;
