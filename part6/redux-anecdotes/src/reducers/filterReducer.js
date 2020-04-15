const initial_state = "";

const reducer = (state = initial_state, action) => {
  if (action.type === "SET_FILTER") {
    return action.payload.filter;
  }

  return state;
};

export const setFilter = filter => {
  return {
    type: "SET_FILTER",
    payload: {
      filter
    }
  };
};

export default reducer;
