import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./slice/toastSlice";
import cartReducer from "./slice/cartSlice";
import loadingReducer from "./slice/loadingSlice";

const store = configureStore({
  reducer: {
    toast: toastReducer,
    cart: cartReducer,
    loading: loadingReducer,
  }
})

export default store;