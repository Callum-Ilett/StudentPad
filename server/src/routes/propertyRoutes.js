import { Router } from "express";
import authMiddleware from "../middleware/checkAuth.js";
import Review from "../models/review.js";

const { checkAuthenticated } = authMiddleware;

const propertyRouter = Router();

propertyRouter.get("/:propertyID/reviews", (req, res) => {
  const { propertyID } = req.params;

  Review.find({ propertyID }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

propertyRouter.post("/reviews/add", (req, res) => {
  const reviewData = req.body;

  Review.create(reviewData, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

export default propertyRouter;
