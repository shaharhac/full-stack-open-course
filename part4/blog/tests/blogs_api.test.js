const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);

beforeEach(async () => {
  await helper.initDatabase();
});

describe("When there is initially some notes saved", () => {
  test("blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;

    expect(blogs).toHaveLength(helper.initial_blogs.length);
  });

  test("a specific blog title is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;
    const blogTitleToSearch = helper.initial_blogs[3].title;

    const titles = blogs.map(blog => blog.title);
    expect(titles).toContain(blogTitleToSearch);
  });

  describe("viewing a specific blog", () => {
    test("succeeds with a valid id", async () => {
      const blogs = await helper.getAll();
      const blogToView = blogs[0];

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200);

      expect(resultBlog.body).toEqual(blogToView);
    });

    test("404 when id doesnt exists", async () => {
      const invalidId = await helper.nonExistingId();
      await api.get(`/api/blogs/${invalidId}`).expect(404);
    });
  });

  describe("addition of a new blog", () => {
    test("a valid blog can be added with correct auth token", async () => {
      const newBlog = {
        title: "shahar",
        author: "mr.author",
        url: "shahar.com/article",
        likes: 700
      };

      const validUser = {
        username: "baba",
        password: "12345"
      };

      const auth = await api.post("/api/login").send(validUser);

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `bearer ${auth.body.token}`)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogs = await helper.getAll();
      const titles = blogs.map(blog => blog.title);

      expect(blogs).toHaveLength(helper.initial_blogs.length + 1);
      expect(titles).toContain(newBlog.title);
    });

    test("a valid blog wont be added with incorrect auth token", async () => {
      const newBlog = {
        title: "shahar",
        author: "mr.author",
        url: "shahar.com/article",
        likes: 700
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `xxxxx`)
        .expect(401);
    });

    test("fails with invalid data", async () => {
      const newBlog = {
        author: "mr.author",
        likes: 700
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400);

      const blogs = await helper.getAll();
      const titles = blogs.map(blog => blog.title);

      expect(blogs).toHaveLength(helper.initial_blogs.length);
      expect(titles).not.toContain(newBlog.title);
    });

    test("likes default to zero", async () => {
      const newBlog = {
        title: "shahar",
        author: "mr.author",
        url: "shahar.com/article"
      };

      const validUser = {
        username: "baba",
        password: "12345"
      };

      const auth = await api.post("/api/login").send(validUser);

      const response = await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `bearer ${auth.body.token}`)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogCreated = response.body;

      expect(blogCreated.likes).toBe(0);
    });
  });

  test("is id defined", async () => {
    const response = await api.get("/api/blogs");
    const blog = response.body[0];

    expect(blog.id).toBeDefined();
    expect(blog._id).toBeUndefined();
  });

  describe("deletion of a blog post", () => {
    test("blog deletes if id is valid", async () => {
      const newBlog = {
        title: "shahar",
        author: "mr.author",
        url: "shahar.com/article",
        likes: 30
      };

      const validUser = {
        username: "baba",
        password: "12345"
      };

      const auth = await api.post("/api/login").send(validUser);

      const response = await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `bearer ${auth.body.token}`);
      const id = response.body.id;

      await api
        .delete(`/api/blogs/${id}`)
        .set("Authorization", `bearer ${auth.body.token}`);

      const deletedBlog = await helper.getOne({ _id: id });
      expect(deletedBlog).toBeNull();
    });
  });

  describe("updating of a blog post", () => {
    test("updated with a valid id", async () => {
      const newBlog = {
        title: "shahar",
        author: "mr.author",
        url: "shahar.com/article",
        likes: 30
      };

      const validUser = {
        username: "baba",
        password: "12345"
      };

      const auth = await api.post("/api/login").send(validUser);

      const response = await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `bearer ${auth.body.token}`);
      const id = response.body.id;

      await api
        .put(`/api/blogs/${id}`)
        .send({ likes: 888 })
        .expect(200);

      const updatedBlog = await helper.getOne({ _id: id });
      expect(updatedBlog.likes).toBe(888);
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
