const reducer = (state = null, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.data.message;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

const setNotification = (message) => ({
  type: "NEW_NOTIFICATION",
  data: { message },
});

const clearNotification = () => ({
  type: "CLEAR_NOTIFICATION",
});

export const notification = (message, delay = 5) => {
  return async (dispatch) => {
    await dispatch(setNotification(message));
    setTimeout(async () => await dispatch(clearNotification()), delay * 1000);
  };
};

export default reducer;
