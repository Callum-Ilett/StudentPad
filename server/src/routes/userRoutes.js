import { Router } from "express";
import authMiddleware from "../middleware/checkAuth.js";
import User from "../models/user.js";
import Review from "../models/review.js";
const { checkAuthenticated } = authMiddleware;

const userRouter = Router();

userRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  User.findById(id, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

userRouter.get("/:id/reviews", (req, res) => {
  const { id } = req.params;

  Review.find({ reviewed_by: id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

userRouter.get("/branch/:email", (req, res) => {
  const { email } = req.params;

  User.find({ email: email }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data[0]);
    }
  });
});

userRouter.post("/favourites/add", (req, res) => {
  const { propertyID, userID } = req.body;
  const update = { $addToSet: { favourites: propertyID } };

  User.findByIdAndUpdate(userID, update, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data.favourites);
    }
  });
});

userRouter.post("/contacts/add", (req, res) => {
  const { contactID, userID } = req.body;

  const update = { $addToSet: { contact_list: contactID } };

  User.findByIdAndUpdate(userID, update, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data.contact_list);
    }
  });
});

export default userRouter;
