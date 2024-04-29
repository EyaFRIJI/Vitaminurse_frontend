import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  successMessage: "",
  errorMessage: "",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSuccessMessage: (state, { payload }) => {
      state.successMessage = payload;
    },
    setErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    clearAll: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
