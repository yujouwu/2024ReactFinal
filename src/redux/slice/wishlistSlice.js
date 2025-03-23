import { createSlice } from "@reduxjs/toolkit";

const loadWishlist = () => {
  const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
  return savedWishlist || {}
}
const savedWishlist = loadWishlist();

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    list: savedWishlist.list,
    qty: savedWishlist.qty
  },
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
export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;