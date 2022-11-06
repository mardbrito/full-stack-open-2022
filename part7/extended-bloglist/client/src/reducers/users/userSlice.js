import { createSlice } from "@reduxjs/toolkit";
import userService from "../../services/user";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      return user;
    },
  },
});

export const { setUser } = userSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    const userFromStorage = await userService.getUser();
    dispatch(setUser(userFromStorage));
  };
};

export const loginUser = (user) => {
  return async (dispatch) => {
    userService.setUser(user);
    dispatch(setUser(user));
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    userService.clearUser();
    dispatch(setUser(null));
  };
};

export default userSlice.reducer;
