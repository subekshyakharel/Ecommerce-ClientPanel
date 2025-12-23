import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, { payload }) => {
      state.wishlist = [...state.wishlist, payload];
    },
    removeProductFromWishlist: (state, { payload }) => {
      const index = state.wishlist.findIndex(
        (product) => product._id === payload
      );
      if (index !== -1) {
        state.wishlist.splice(index, 1);
      }
    },
  },
});

const { reducer, actions } = wishlistSlice;

export const { setWishlist, removeProductFromWishlist } = actions;
export default reducer;
