const inital_state = "";

const reducer = (state = inital_state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "UNSET_NOTIFICATION":
      return {};
    default:
      return state;
  }
};

export const setNotification = (text, seconds) => {
  return async (dispatch, getState) => {
    const currentId = getState().notification.id;
    if (currentId) {
      clearTimeout(currentId);
    }

    const id = setTimeout(
      () =>
        dispatch({
          type: "UNSET_NOTIFICATION"
        }),
      seconds * 1000
    );

    dispatch({
      type: "SET_NOTIFICATION",
      payload: {
        text,
        id
      }
    });
  };
};

export default reducer;
