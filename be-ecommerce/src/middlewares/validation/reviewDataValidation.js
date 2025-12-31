import {
  _ID_REQ,
  LONG_STR_REQ,
  RATING_REQ,
  SHORT_STR_REQ,
} from "./joiConst.js";
import { validateData } from "./joiValidation.js";

export const newReviewDataValidation = (req, res, next) => {
  const obj = {
    title: SHORT_STR_REQ,
    reviewMessage: LONG_STR_REQ,
    rating: RATING_REQ,
    productId: _ID_REQ,
    orderId: _ID_REQ,
  };
  validateData({ req, res, next, obj });
};
