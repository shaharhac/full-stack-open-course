import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, handleLike, handleRemove }) => (
  <div className="blogList">
    {blogs
      .sort((a, b) => (a.likes > b.likes ? -1 : 1))
      .map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
  </div>
);

export default BlogList;
