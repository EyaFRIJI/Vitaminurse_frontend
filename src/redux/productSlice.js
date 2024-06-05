import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listProducts: [],
  searchedProduct: [],
  search: false,
  images: [],
  scannedID: null,
  analyse_ocr: null,
  name: "",
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
    addImage: (state, { payload }) => {
      state.images.push(payload);
    },
    deleteImage: (state, { payload }) => {
      state.images = state.images.filter((image) => {
        return image !== payload;
      });
    },
    clearImages: (state) => {
      state.images = [];
    },
    setScannedId: (state, { payload }) => {
      state.scannedID = payload;
    },
    setAnalyseOCR: (state, { payload }) => {
      state.analyse_ocr = payload;
    },
    setName: (state, { payload }) => {
      state.name = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const productActions = productSlice.actions;

export default productSlice.reducer;
