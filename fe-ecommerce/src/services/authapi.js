import { apiProcessor } from "./api";

const apibaseUrl = import.meta.env.VITE_BASE_URL_CLIENT;
// || "http://localhost:3000";
const authApi = apibaseUrl + "/api/v1/auth";

export const signupNewUserApi = async (payload) => {
  try {
    const obj = {
      method: "post",
      url: authApi + "/register",
      payload,
      showToast: true,
    };
    const result = await apiProcessor(obj);
    return result;
  } catch (error) {
    console.log(error.message);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const loginUserApi = async (payload) => {
  const obj = {
    method: "post",
    url: authApi + "/login",
    payload,
    showToast: true,
  };
  return apiProcessor(obj);
};

//request new accessJwt api
export const fetchNewAccessJWtApi = async () => {
  try {
    const obj = {
      method: "get",
      url: authApi + "/renew-jwt",
      isPrivateCall: true,
      isRefreshJwt: true,
    };
    return apiProcessor(obj);
  } catch (error) {
    console.log(error.message);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const logoutUserApi = async () => {
  const obj = {
    method: "get",
    url: authApi + "/logout",
    isPrivateCall: true,
  };
  return apiProcessor(obj);
};
