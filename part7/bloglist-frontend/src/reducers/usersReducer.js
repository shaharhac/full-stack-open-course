import usersService from "../services/users";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_USERS":
      return action.payload.users;
    default:
      return state;
  }
};

export const initUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll();
    dispatch({
      type: "INIT_USERS",
      payload: {
        users
      }
    });
  };
};

export default reducer;
