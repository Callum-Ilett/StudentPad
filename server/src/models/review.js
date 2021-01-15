import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userID: { type: String },
    propertyID: { type: Number },
    rating: { type: Number },
    reviewText: { type: String },
    reviewed_by: { type: String },
  },

  { timestamps: { createdAt: "created_at" } }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
