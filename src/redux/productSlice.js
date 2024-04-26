import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listProducts: [],
  searchedProduct: [],
  search: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.search = false;
      state.listProducts = action.payload;
    },
    searchProduct: (state, action) => {
      state.search = true;
      state.searchedProduct = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const productActions = productSlice.actions;

export default productSlice.reducer;
