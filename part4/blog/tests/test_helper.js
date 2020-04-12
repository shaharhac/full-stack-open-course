const Blog = require("../models/Blog");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const initial_blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
];

const inital_users = [
  {
    username: "baba",
    name: "baba",
    password: "12345"
  },
  {
    username: "bobo",
    name: "bobo",
    password: "12345"
  }
];

const initDatabase = async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  const blogsToCreate = initial_blogs.map(blog => new Blog(blog));
  const savedBlogs = blogsToCreate.map(blog => blog.save());
  await Promise.all(savedBlogs);

  const saltRounds = 10;
  const savedUsers = [];
  for (user of inital_users) {
    const userToCreate = new User({
      ...user,
      passwordHash: await bcrypt.hash(user.password, saltRounds)
    });

    savedUsers.push(userToCreate.save());
  }
  await Promise.all(savedUsers);
};

const nonExistingId = async () => {
  const newBlog = new Blog({
    title: "shahar",
    author: "mr.author",
    url: "shahar.com/article",
    likes: 700
  });

  await newBlog.save();
  await newBlog.remove();

  return newBlog._id.toString();
};

const getAll = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const getOne = async query => {
  const blog = await Blog.findOne(query);
  return blog && blog.toJSON();
};

module.exports = {
  initial_blogs,
  initDatabase,
  getAll,
  getOne,
  nonExistingId
};
