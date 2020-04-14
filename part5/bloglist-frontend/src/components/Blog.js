import React, { useState } from "react";

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [expanded, setExpanded] = useState(false);

  const buttonText = expanded ? "hide" : "show";

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={blogStyle}>
      <span className="blogTitle">
        {blog.title}
        <button className="ExpandButton" onClick={handleExpand}>
          {buttonText}
        </button>
      </span>
      {expanded ? (
        <div className="blogContent">
          {blog.url}
          <br />
          <span>
            likes <span className="likesAmmount">{blog.likes}</span>
            <button className="likeButton" onClick={() => handleLike(blog)}>
              like
            </button>
          </span>
          <br />
          {blog.author}
          <br />
          <button className="removeButton" onClick={() => handleRemove(blog)}>
            remove
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
