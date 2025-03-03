import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: 'toast',
  initialState: [
    // {
    //   id: Date.now(),
    //   success: true,
    //   title: '1',
    //   message: '1'
    // },
  ],
  reducers: {
    createToast(state, action){
      const { requestId, success, message } = action.payload;
      state.push({
        id: requestId,
        success,
        title: success ? '成功' : '失敗',
        message: Array.isArray(message) ? message.join('、') : message
      })
    },
    removeToast(state, action){
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    }
  }
})

const createAsyncToast = createAsyncThunk(
  'toast/createAsyncToast',
  async function(payload, { dispatch, requestId}){
    dispatch(createToast({
      ...payload,
      requestId
    }))
    setTimeout(() => {
      dispatch(removeToast(requestId))
    }, 2000)
  }
)
export { createAsyncToast };
export const { createToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;