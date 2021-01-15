import mongoose from "mongoose";
import Pusher from "pusher";

const { MONGO_URI } = process.env;

const pusher = new Pusher({
  appId: "1111403",
  key: "229afceab059fd11ec1e",
  secret: "618c13d5ae8f536e3c0b",
  cluster: "eu",
  useTLS: true,
});

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose
  .connect(MONGO_URI, options)
  .then(() => console.log("MongoDB is connected"));

const db = mongoose.connection;

db.once("open", () => {
  const messagesCollection = db.collection("messages");

  const changeStream = messagesCollection.watch();

  changeStream.on("change", (change) => {
    console.log("new record inserted into database");
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        sender: messageDetails.sender,
        recipient: messageDetails.recipient,
        message: messageDetails.message,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});
