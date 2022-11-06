import { configureStore } from "@reduxjs/toolkit";

import notificationSlice from "./reducers/notification/notificationSlice";
import userSlice from "./reducers/users/userSlice";
import usersSlice from "./reducers/users/usersSlice";
import blogSlice from "./reducers/blogs/blogSlice";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: blogSlice,
    user: userSlice,
    users: usersSlice,
  },
});

export default store;
