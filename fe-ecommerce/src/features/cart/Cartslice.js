import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  recentOrder: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, { payload }) => {
      state.cart = [...state.cart, payload];
    },
    removeProductFromCart: (state, { payload }) => {
      const index = state.cart.findIndex((product) => product._id === payload);
      if (index !== -1) {
        state.cart.splice(index, 1); // removes only that one item
      }
    },

    emptyCart: (state) => {
      state.cart = [];
    },
    setRecentOrder: (state, { payload }) => {
      state.recentOrder = payload;
    },
    emptyRecentOrder: (state) => {
      state.recentOrder = [];
    },
    // Increment quantity
    incrementQuantity: (state, { payload }) => {
      const item = state.cart.find((item) => item._id === payload);
      if (item) {
        item.quantity += 1;
      }
    },

    // Decrement quantity
    decrementQuantity: (state, { payload }) => {
      const item = state.cart.find((item) => item._id === payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

const { reducer, actions } = cartSlice;

export const {
  setCart,
  removeProductFromCart,
  emptyCart,
  setRecentOrder,
  emptyRecentOrder,
  incrementQuantity,
  decrementQuantity,
} = actions;

export default reducer;
