import { apiProcessor } from "../../services/api.js";

const apiBaseUrl = import.meta.env.VITE_BASE_URL_CLIENT;
const orderApiEp = apiBaseUrl + "/api/v1/order";

export const postOrderApi = async (payload) => {
  const obj = {
    method: "post",
    url: orderApiEp,
    showToast: true,
    isPrivateCall: true,
    payload,
  };
  const result = await apiProcessor(obj);
  console.log("postOrderApi result:", result);
  return result;
};
