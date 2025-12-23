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
  },
});

const { reducer, actions } = orderSlice;

export const { setMyOrder } = actions;

export default reducer;
