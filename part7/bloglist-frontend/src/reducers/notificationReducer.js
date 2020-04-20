const reducer = (state = { enabled: false }, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "UNSET_NOTIFICATION":
      return { enabled: false };
    default:
      return state;
  }
};

export const dispalyNotification = (text, notifType) => {
  return async dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      payload: {
        enabled: true,
        text,
        type: notifType
      }
    });

    setTimeout(() => dispatch({ type: "UNSET_NOTIFICATION" }), 5000);
  };
};

export default reducer;
