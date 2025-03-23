import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./slice/toastSlice";
import cartReducer from "./slice/cartSlice";
import loadingReducer from "./slice/loadingSlice";
import wishlistReducer from "./slice/wishlistSlice";
import productsReducer from "./slice/productsSlice";

const store = configureStore({
  reducer: {
    toast: toastReducer,
    cart: cartReducer,
    loading: loadingReducer,
    wishlist: wishlistReducer,
    products: productsReducer
  }
})

export default store;