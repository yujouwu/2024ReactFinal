import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name : 'loading',
  initialState: {
    globalLoading: false,
    actionLoading: false,
  },
  reducers: {
    setGlobalLoading(state, action) {
      state.globalLoading = action.payload
    },
    setActionLoading(state, action) {
      state.actionLoading = action.payload
    },

    setLoading(state, action) {
      const { key, value } = action.payload;
      state[key] = value;
    }
  }
})

const asyncSetLoading = createAsyncThunk(
  'loading/asyncSetLoading',
  async function([key, value], { dispatch }){
    if(value){
      dispatch(setLoading({key, value}))
    } else {
      setTimeout(() => {
        dispatch(setLoading({key, value}))
      }, 500)
    }
  }
)
export { asyncSetLoading };
export const { setGlobalLoading, setActionLoading, setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;