import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    connecter: (state, action) => {
      state.user = action.payload;
    },
    inscrire: (state, action) => {
      state.user = action.payload;
    },
    deconnecter: (state) => {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const userActions = counterSlice.actions;

export default counterSlice.reducer;
