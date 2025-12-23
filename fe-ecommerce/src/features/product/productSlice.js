import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProduct: {},
  allProduct: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setAllProduct: (state, action) => {
      state.allProduct = action.payload;
    },
  },
});

const { reducer, actions } = productSlice;

export const { setSelectedProduct, setAllProduct } = actions;

export default reducer;
