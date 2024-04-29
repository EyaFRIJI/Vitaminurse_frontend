import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import uiSlice from "./uiSlice";

export const store = configureStore({
  reducer: { userSlice, productSlice, uiSlice },
});
