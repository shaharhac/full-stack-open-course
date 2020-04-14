import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({});

  const blogFormRef = React.createRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsFromServer = await blogService.getAll();
      setBlogs(blogsFromServer);
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const loginWithLocalStorage = async () => {
      const user = window.localStorage.getItem("userConnected");

      if (user) {
        const userObject = JSON.parse(user);
        setUser(userObject);
        blogService.setToken(userObject.token);
      }
    };

    loginWithLocalStorage();
  }, []);

  const showNotification = ({ message, type }) => {
    setNotification({
      enabled: true,
      message,
      type
    });

    setTimeout(() => setNotification({ enabled: false }), 3000);
  };

  const handleBlogCreation = async (event, blog) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const newBlog = await blogService.createBlog(blog);
    setBlogs(blogs.concat(newBlog));
    showNotification({
      message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      type: "success"
    });
  };

  const handleLogin = async (event, username, password) => {
    event.preventDefault();
    const user = await loginService.loginWithCredentials({
      username,
      password
    });

    if (user.error) {
      showNotification({
        message: user.error,
        type: "error"
      });
      return;
    }

    window.localStorage.setItem("userConnected", JSON.stringify(user));
    setUser(user);
    blogService.setToken(user.token);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("userConnected");
    setUser(null);
  };

  const handleLike = async blogToUpdate => {
    const updatedBlog = await blogService.updateBlog({
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    });

    setBlogs(
      blogs.filter(blog => blog.id !== blogToUpdate.id).concat(updatedBlog)
    );
  };

  const handleRemove = async blogToDelete => {
    const confirm = window.confirm(
      `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
    );

    if (confirm) {
      await blogService.deleteBlog(blogToDelete.id);
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id));
    }
  };

  if (!user) {
    return (
      <div>
        <h1>Blogs</h1>
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
        <h2>Blogs</h2>
        {notification.enabled ? (
          <Notification notification={notification} />
        ) : null}
        <h3>
          Hello {user.username}! <button onClick={handleLogout}>logout</button>
        </h3>
        <Togglable
          buttonLabel="Create Blog"
          backLabel="Cancel"
          ref={blogFormRef}
        >
          <AddBlogForm handleBlogCreation={handleBlogCreation} />
        </Togglable>
        <div className="blogList">
          {blogs
            .sort((a, b) => (a.likes > b.likes ? -1 : 1))
            .map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleRemove={handleRemove}
              />
            ))}
        </div>
      </div>
    );
  }
};

export default App;
