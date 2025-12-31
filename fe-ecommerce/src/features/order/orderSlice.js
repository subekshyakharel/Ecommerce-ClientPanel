import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myOrder: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setMyOrder: (state, { payload }) => {
      state.myOrder = payload;
    },
    removeOrder: (state, { payload }) => {
      state.myOrder = state.myOrder.filter((order) => order._id !== payload);
    },
  },
});

const { reducer, actions } = orderSlice;

export const { setMyOrder, removeOrder } = actions;

export default reducer;
