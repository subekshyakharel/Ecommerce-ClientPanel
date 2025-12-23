import { apiProcessor } from "../../services/api.js";

const apibaseUrl = import.meta.env.VITE_BASE_URL_ADMIN;
const adminApiEp = apibaseUrl + "/api/v1";

export const fetchAllProductApi = async () => {
  try {
    const obj = {
      method: "get",
      url: adminApiEp + "/getAllProduct",
    };
    const result = await apiProcessor(obj);
    console.log(result);
    return result;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const fetchSingleProductApi = async (slug) => {
  const obj = {
    method: "get",
    url: adminApiEp + "/public/" + slug,
  };
  const result = await apiProcessor(obj);
  return result;
};
