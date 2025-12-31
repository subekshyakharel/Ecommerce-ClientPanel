import { fetchAllProductApi, fetchSingleProductApi } from "./productApi.js";
import { setAllProduct, setSelectedProduct } from "./productSlice.js";

export const fetchAllProductAction = () => async (dispatch) => {
  const { status, payload } = await fetchAllProductApi();

  if (status === "success" && Array.isArray(payload)) {
    dispatch(setAllProduct(payload));
  }
};

export const fetchSingleProductAction = (_id) => async (dispatch) => {
  const { status, payload } = await fetchSingleProductApi(_id);
  status === "success" && dispatch(setSelectedProduct(payload));
};
