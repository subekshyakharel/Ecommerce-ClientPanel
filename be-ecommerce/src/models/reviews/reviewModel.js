import reviewSchema from "./reviewSchema.js";
import ReviewSchema from "./reviewSchema.js";

export const createReview = (reviewObj) => {
  return ReviewSchema(reviewObj).save();
};

export const getSingleProductReview = (id) => {
  return ReviewSchema.find({ productId: id });
};
