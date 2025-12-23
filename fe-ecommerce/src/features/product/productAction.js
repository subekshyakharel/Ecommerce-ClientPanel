import { fetchAllProductApi, fetchSingleProductApi } from "./productApi.js";
import { setAllProduct, setSelectedProduct } from "./productSlice.js";

export const fetchAllProductAction = () => async (dispatch) => {
  const { status, payload } = await fetchAllProductApi();

  if (status === "success" && Array.isArray(payload)) {
    dispatch(setAllProduct(payload));
  }
};

export const fetchSingleProductAction = (slug) => async (dispatch) => {
  const { status, payload } = await fetchSingleProductApi(slug);
  status === "success" && dispatch(setSelectedProduct(payload));
};
