import React, { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import UserInfo from "./components/UserInfo";
import BlogInfo from "./components/BlogInfo";
import Menu from "./components/Menu";

import { Switch, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  initBlogs,
  createBlog,
  likeBlog,
  deleteBlog
} from "./reducers/blogsReducer";

import { loginLocalStorage, login, logout } from "./reducers/loginReducer";
import { dispalyNotification } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.loggedInUser);
  const notification = useSelector(state => state.notification);
  const blogFormRef = React.createRef();

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loginLocalStorage());
  }, [dispatch]);

  const showNotification = ({ message, type }) => {
    dispatch(dispalyNotification(message, type));
  };

  const handleBlogCreation = async (event, blog) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();

    dispatch(createBlog(blog));

    showNotification({
      message: `a new blog ${blog.title} by ${blog.author} added`,
      type: "success"
    });
  };

  const handleLogin = async (event, username, password) => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLike = async blogToUpdate => {
    dispatch(likeBlog(blogToUpdate));
  };

  const handleRemove = async blogToDelete => {
    const confirm = window.confirm(
      `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
    );

    if (confirm) {
      dispatch(deleteBlog(blogToDelete));
    }
  };

  if (!user) {
    return (
      <div>
        <h1 className="title">Blogs</h1>
        <Togglable buttonLabel="login" backLabel="Cancel">
          {notification.enabled ? (
            <Notification notification={notification} />
          ) : null}
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      </div>
    );
  } else {
    return (
      <div>
        <Menu handleLogout={handleLogout} />
        <h2 className="title">Blogs</h2>
        {notification.enabled ? (
          <Notification notification={notification} />
        ) : null}
        <Switch>
          <Route path="/users/:id">
            <UserInfo />
          </Route>
          <Route path="/users">
            <h2>Users</h2>
            <UserList />
          </Route>
          <Route path="/blogs/:id">
            <BlogInfo handleLike={handleLike} />
          </Route>
          <Route path="/">
            <Togglable
              buttonLabel="Create Blog"
              backLabel="Cancel"
              ref={blogFormRef}
            >
              <AddBlogForm handleBlogCreation={handleBlogCreation} />
            </Togglable>
            <BlogList
              blogs={blogs}
              handleLike={handleLike}
              handleRemove={handleRemove}
            />
          </Route>
        </Switch>
      </div>
    );
  }
};

export default App;
