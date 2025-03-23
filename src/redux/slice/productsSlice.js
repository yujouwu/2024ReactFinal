import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


const asyncGetProductsAll = createAsyncThunk(
  'products/asyncGetProductsAll',
  // async function(payload, {dispatch}){
  async function(){
    try {
      const url = `${BASE_URL}/api/${API_PATH}/products/all`;
      const response = await axios.get(url);
      return response.data.products
    } catch (error) {
      alert(`取得「所有」產品失敗: ${error.response.data.message}`);
    }
  }
)
const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetProductsAll.fulfilled, (state, action) => {
        return action.payload
      })
  }
})
export { asyncGetProductsAll };
export default productsSlice.reducer;