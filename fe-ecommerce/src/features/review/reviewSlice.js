import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  productReview: [],
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setAllReview: (state, { payload }) => {
      state.reviews = payload;
    },
    setProductReview: (state, action) => {
      state.productReview = action.payload;
    },
  },
});

const { reducer, actions } = reviewSlice;

export const { setAllReview, setProductReview } = actions;

export default reducer;
