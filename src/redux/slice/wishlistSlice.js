import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAsyncToast } from "./toastSlice";

const loadWishlist = () => {
  const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
  return savedWishlist || { list: {}, qty: 0}
}
const savedWishlist = loadWishlist();

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: savedWishlist,
  reducers: {
    toggleWishlist(state, action) {
      const productId = action.payload;
      state.list[productId] = !state.list[productId]; // toggle true/ false
      state.qty = Object.values(state.list).reduce((count, value) => count + (value ? 1 : 0), 0)
      // localStorage setItem
      localStorage.setItem("wishlist", JSON.stringify(state))
    }
  }
})
const asyncToggleWishlist = createAsyncThunk(
  'wishlist/asyncToggleWishlist',
  async function (payload, { getState, dispatch }) {
    try {
      const wishlist = getState().wishlist.list;
      dispatch(toggleWishlist(payload))
      dispatch(createAsyncToast({
        success: true,
        message: wishlist[payload] ? '成功將商品移除願望清單' : '成功將商品加入願望清單',
      }))
    } catch {
      dispatch(createAsyncToast({ success: false, message: '願望清單操作失敗'}))
    }
  }
)
export { asyncToggleWishlist };
export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;