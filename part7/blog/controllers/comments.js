const commentsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/Blog");
const User = require("../models/User");
const Comment = require("../models/Comment");
const config = require("../utils/config");

commentsRouter.get("/:id/comments", async (request, response) => {
  const blogId = request.params.id;
  const comments = await Comment.find({ blog: blogId });
  response.json(comments.map(comment => comment.toJSON()));
});

commentsRouter.post("/:id/comments", async (request, response) => {
  if (!request.body.text) {
    return response.status(400).send({ error: "malformed request" });
  }

  const blogId = request.params.id;
  const blog = await Blog.findById(blogId);

  if (!blogId || !blog) {
    return response.status(404).send({ error: "blog not found" });
  }

  const commentParams = {
    text: request.body.text,
    blog: blogId
  };

  const comment = new Comment(commentParams);
  await comment.save();

  blog.comments = blog.comments.concat(comment._id);
  await blog.save();

  response.json(comment.toJSON());
});

module.exports = commentsRouter;
