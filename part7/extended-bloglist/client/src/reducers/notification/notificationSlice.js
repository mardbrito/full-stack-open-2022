import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

let timeout = null;

export const createNotification = (message) => {
  return (dispatch) => {
    dispatch(setMessage(message));

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => dispatch(setMessage(null)), 3000);
  };
};

export const { setMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
