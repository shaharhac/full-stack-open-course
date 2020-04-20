import blogService from "../services/blogs";
import loginService from "../services/login";
import { dispalyNotification } from "./notificationReducer";

const reducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.loginWithCredentials({
      username,
      password
    });

    if (user.error) {
      dispatch(dispalyNotification(user.error, "error"));
      return;
    }

    window.localStorage.setItem("userConnected", JSON.stringify(user));
    blogService.setToken(user.token);

    dispatch({
      type: "LOGIN",
      payload: {
        ...user
      }
    });
  };
};

export const loginLocalStorage = () => {
  return async dispatch => {
    const user = window.localStorage.getItem("userConnected");
    if (user) {
      const userObject = JSON.parse(user);
      blogService.setToken(userObject.token);

      dispatch({
        type: "LOGIN",
        payload: {
          ...userObject
        }
      });
    }
  };
};

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem("userConnected");
    dispatch({
      type: "LOGOUT"
    });
  };
};

export default reducer;
