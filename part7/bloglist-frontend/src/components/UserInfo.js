import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

const UserInfo = () => {
  const match = useRouteMatch("/users/:id");
  const allUsers = useSelector(state => state.users);
  const user = match
    ? allUsers.find(user => user.id === match.params.id)
    : null;

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserInfo;
