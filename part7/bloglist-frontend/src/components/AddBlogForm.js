import React, { useState } from "react";

const AddBlogForm = ({ handleBlogCreation }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const clearStateAndUseHandler = (event, blog) => {
    setTitle("");
    setAuthor("");
    setUrl("");
    handleBlogCreation(event, blog);
  };

  return (
    <div>
      <h2>create new</h2>
      <form
        id="form"
        onSubmit={event =>
          clearStateAndUseHandler(event, { title, author, url })
        }
      >
        <label>title: </label>
        <input
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        <label>author: </label>
        <input
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        <label>url: </label>
        <input
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default AddBlogForm;
