import { responseClient } from "../middlewares/responseClient.js";
import { updateOrder } from "../models/orderHistory/orderModel.js";
import {
  createReview,
  getSingleProductReview,
} from "../models/reviews/reviewModel.js";

export const insertReviewController = async (req, res, next) => {
  try {
    const { _id, fName, lName } = req.userInfo;
    const obj = {
      userId: _id,
      userName: `${fName} ${lName}`,
      ...req.body,
    };

    const result = await createReview(obj);
    if (result?._id) {
      const reviewId = result._id;
      const updateResult = await updateOrder(
        { _id: result.orderId },
        { reviewId: reviewId }
      );

      if (updateResult?._id) {
        return responseClient({
          req,
          res,
          message: "The review has been recieved successfully!",
        });
      }
    }
    responseClient({
      req,
      res,
      message: "Something went wrong, Please contact administration!",
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleProductReviewsController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getSingleProductReview(id);

    if (result) {
      responseClient({
        req,
        res,
        message: "Here is the list of review",
        payload: result,
      });
    }
  } catch (error) {
    next(error);
  }
};
