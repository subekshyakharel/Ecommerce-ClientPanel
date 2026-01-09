import { apiProcessor } from "../../services/api";

const apibaseurl = import.meta.env.VITE_BASE_URL_CLIENT;
// || "http://localhost:3000";
const reviewApiEp = apibaseurl + "/api/v1/review";

export const postNewReviewApi = async (payload) => {
  const obj = {
    method: "post",
    url: reviewApiEp,
    showToast: true,
    isPrivateCall: true,
    payload,
  };
  const result = await apiProcessor(obj);
  return result;
};

export const getSingleProductReviewApi = async (id) => {
  const obj = {
    method: "get",
    url: reviewApiEp + "/" + id,
  };
  const result = await apiProcessor(obj);
  return result;
};
