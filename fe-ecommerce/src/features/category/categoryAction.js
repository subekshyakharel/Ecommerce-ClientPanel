import { fetchAllCategories, fetchParentCategories } from "./categoryApi.js";
import { setAllCategory, setParentCategory } from "./categorySlice.js";

export const fetchAllCategoriesAction = () => async (dispatch) => {
  try {
    const { status, payload } = await fetchAllCategories();
    if (status === "success") {
      dispatch(setAllCategory(payload));
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

export const fetchParentCategoriesAction = () => async (dispatch) => {
  try {
    const { status, payload } = await fetchParentCategories();
    if (status === "success") {
      dispatch(setParentCategory(payload));
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};
