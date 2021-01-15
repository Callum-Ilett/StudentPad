import { Router } from "express";
import authMiddleware from "../middleware/checkAuth.js";
import Message from "../models/message.js";

const { checkAuthenticated } = authMiddleware;

const messagesRouter = Router();

messagesRouter.get("/sync", (req, res) => {
  Message.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

messagesRouter.post("/new", async (req, res) => {
  const messageData = req.body;

  Message.create(messageData, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

export default messagesRouter;
