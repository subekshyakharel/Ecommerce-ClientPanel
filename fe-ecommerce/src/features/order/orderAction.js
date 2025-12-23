import { fetchMyOrderApi } from "./orderApi.js";
import { setMyOrder } from "./orderSlice.js";

export const fetchMyOrderAction = () => async (dispatch) => {
  try {
    const { status, payload } = await fetchMyOrderApi();
    if (status === "success") {
      dispatch(setMyOrder(payload));
    }
  } catch (error) {
    console.log("Failed to fetch ym order: ", error.message);
  }
};
