import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../reducers/blogsReducer";
import CommentItem from "./CommentItem";
import { Button, Comment, Form, Header } from "semantic-ui-react";

const BlogInfo = ({ handleLike }) => {
  const [commentInput, setCommentInput] = useState("");
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const match = useRouteMatch("/blogs/:id");

  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null;
  if (!blog) {
    return null;
  }
  const comments = blog.comments || [];
  const handleCommentSubmit = async event => {
    event.preventDefault();
    dispatch(addComment(blog.id, commentInput));
    setCommentInput("");
  };

  return (
    <div>
      <h1 className="subtitle">{blog.title}</h1>
      <div>
        <a href={`http://${blog.url}`}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes{" "}
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      <div>added by {blog.user.username}</div>
      <div>
        <Comment.Group>
          <Header as="h3" dividing>
            Comments
          </Header>

          {comments.map(comment => (
            <CommentItem key={comment.id} text={comment.text}></CommentItem>
          ))}
          <Form reply onSubmit={handleCommentSubmit}>
            <Form.TextArea
              value={commentInput}
              onChange={({ target }) => setCommentInput(target.value)}
            />
            <Button
              type="submit"
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>
      </div>
    </div>
  );
};

export default BlogInfo;
