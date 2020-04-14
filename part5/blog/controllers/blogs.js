const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/Blog");
const User = require("../models/User");
const config = require("../utils/config");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");

  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);

  if (!blog) {
    return response.status(404).end();
  }

  response.status(200).json(blog);
});

blogsRouter.post("/", async (request, response) => {
  if (!request.body.url && !request.body.title) {
    return response.status(400).send({ error: "malformed request" });
  }

  const decodedToken = request.token
    ? jwt.verify(request.token, config.SECRET)
    : undefined;
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token is missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  blogParams = {
    ...request.body,
    likes: request.body.likes || 0,
    user: user._id
  };
  const blog = new Blog(blogParams);
  const result = await blog.save();

  user.blogs = user.blogs.concat(blog._id);
  await user.save();

  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogId = request.params.id;
  const blog = await Blog.findById(blogId);

  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token is missing or invalid" });
  }

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response
      .status(401)
      .json({ error: "user unauthorized: user can delete just his own blogs" });
  }

  await blog.remove();

  response.status(203).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;

  const blog = {
    ...request.body,
    likes: request.body.likes
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });

  if (!updatedBlog) {
    return response.status(404).end();
  }

  response.status(200).json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
