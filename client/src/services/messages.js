import axios from "axios";

const messagesService = {
  SyncMessages: async () => {
    try {
      return await axios.get("/api/messages/sync");
    } catch (error) {
      return error.response;
    }
  },

  SendMessage: async (messageData) => {
    try {
      return await axios.post("/api/messages/new", messageData);
    } catch (error) {
      return error.response;
    }
  },
};

export default messagesService;
