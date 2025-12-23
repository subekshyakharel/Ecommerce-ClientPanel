import {
  DATE_REQ,
  LONG_STR_REQ,
  NUMBER_REQ,
  SHORT_STR_REQ,
  SIZE_REQ,
} from "./joiConst.js";
import { validateData } from "./joiValidation.js";

export const newOrderDataValidation = (req, res, next) => {
  const obj = {
    productId: SHORT_STR_REQ,
    productTitle: SHORT_STR_REQ,
    thumbnail: LONG_STR_REQ,
    productSlug: SHORT_STR_REQ,
    quantity: NUMBER_REQ,
    size: SIZE_REQ,
    price: NUMBER_REQ,
  };
  validateData({ req, res, next, obj });
};
