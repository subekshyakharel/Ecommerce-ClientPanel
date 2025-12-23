import { apiProcessor } from "../../services/api.js";

const apibaseUrl = import.meta.env.VITE_BASE_URL_CLIENT;
const userApiEP = apibaseUrl + "/api/v1/users";

export const fetchUserApi = async () => {
  try {
    const obj = {
      method: "get",
      url: userApiEP + "/profile",
      showToast: false,
      isPrivateCall: true,
    };
    const result = await apiProcessor(obj);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error.message);
    return {
      status: "error",
      message: error.message,
    };
  }
};
