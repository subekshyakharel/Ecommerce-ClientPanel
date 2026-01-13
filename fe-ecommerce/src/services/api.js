import axios from "axios";
import { toast } from "react-toastify";
import { fetchNewAccessJWtApi } from "./authapi.js";
// import { fetchNewAccessJWtApi } from "./authApi";

const getAccessJWT = () => {
  return sessionStorage.getItem("accessJWT");
};
const getRefreshJWT = () => {
  return localStorage.getItem("refreshJWT");
};

export const apiProcessor = async ({
  method,
  url,
  payload,
  showToast,
  isPrivateCall,
  isRefreshJwt,
}) => {
  try {
    const headers = {};
    if (isPrivateCall) {
      const token = isRefreshJwt ? getRefreshJWT() : getAccessJWT();
      headers.authorization = "Bearer " + token;
    }

    const responsePending = axios({
      method,
      url,
      data: payload,
      headers,
    });
    if (showToast) {
      toast.promise(responsePending, {
        pending: "Please wait....(This might take few seconds)",
      });
    }
    const { data } = await responsePending;
    showToast && toast[data.status](data.message);
    return data;
  } catch (error) {
    const msg = error?.response?.data?.message || error.message;
    showToast && toast.error(msg);
    console.log(msg);
    if (error.status === 401) {
      if (msg === "jwt expired") {
        // call api to get new accessJWT
        const { payload } = await fetchNewAccessJWtApi();
        console.log(token);
        if (payload) {
          sessionStorage.setItem("accessJWT", payload);
          //call the apiProcessor
          return apiProcessor({
            method,
            url,
            payload,
            showToast,
            isPrivateCall,
            isRefreshJwt,
          });
        }
      } else {
        sessionStorage.removeItem("accessJWT");
        localStorage.removeItem("refreshJWT");
      }
    }

    return {
      status: "error",
      message: msg,
    };
  }
};
