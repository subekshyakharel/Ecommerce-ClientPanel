import { apiProcessor } from "../../services/api";

const apiBaseUrl = import.meta.env.VITE_BASE_URL_CLIENT;
const orderApiEp = apiBaseUrl + "/api/v1/order";

export const fetchMyOrderApi = async () => {
  const obj = {
    method: "get",
    url: orderApiEp,
    isPrivateCall: true,
  };
  const result = await apiProcessor(obj);
  return result;
};

export const deleteOrderApi = async (id) => {
  const obj = {
    method: "delete",
    url: orderApiEp + "/" + id,
    isPrivateCall: true,
    showToast: true,
  };
  const result = await apiProcessor(obj);
  return result;
};
