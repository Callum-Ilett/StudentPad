import axios from "axios";

const messagesService = {
  SyncMessages: async () => {
    try {
      return await axios.get("/messages/sync");
    } catch (error) {
      return error.response;
    }
  },

  SendMessage: async (messageData) => {
    try {
      return await axios.post("/messages/new", messageData);
    } catch (error) {
      return error.response;
    }
  },
};

export default messagesService;
