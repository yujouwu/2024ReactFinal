import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncToast } from "./toastSlice";
import { setActionLoading, setGlobalLoading } from "./loadingSlice";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const asyncGetCart = createAsyncThunk(
  'cart/asyncGetCart',
  async function(payload, {dispatch}){
    // setIsLoadingScreen(true)
    dispatch(setGlobalLoading(true))
    try {
      const url = `${BASE_URL}/api/${API_PATH}/cart`;
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      dispatch(createAsyncToast(error.response.data)) // {success: false, message: '您所查看的API不存在 >_<'}
    } finally{
      // setIsLoadingScreen(false)
      dispatch(setGlobalLoading(false))
    }
  }
)

const asyncAddCart = createAsyncThunk(
  'cart/asyncAddCart',
  async function(payload, { dispatch }){
    const {productId, qty} = payload;
    dispatch(setGlobalLoading(true))
    try {
      const url = `${BASE_URL}/api/${API_PATH}/cart`;
      const data = {
        "data": {
          "product_id": productId,
          "qty": qty
        }
      }
      const response = await axios.post(url, data);
      dispatch(asyncGetCart());
      dispatch(createAsyncToast(response.data))
    } catch (error) {
      console.dir(error);
      dispatch(createAsyncToast(error.response.data))
    } finally {
      dispatch(setGlobalLoading(false))
    }
  }
)

const initialState = {
  carts: [],
  total: 0,
  final_total: 0,
  basketQty: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetCart.fulfilled, (state, action) => {
        const { carts, total, final_total } = action.payload;
        state.carts = carts;
        state.total = total;
        state.final_total = final_total;
        state.basketQty = carts.reduce((sum, item) => sum + item.qty, 0)
      })
  }
})

export { asyncGetCart, asyncAddCart }
export default cartSlice.reducer;