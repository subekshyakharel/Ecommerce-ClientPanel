import { getSingleProductReviewApi } from "./reviewApi";
import { setProductReview } from "./reviewSlice";

export const getSingleProductReviewAction = (id) => async (dispatch) => {
  const { status, message, payload } = await getSingleProductReviewApi(id);

  if (status === "success") {
    dispatch(setProductReview(payload));
  }
  console.log(status, message, payload);
};
