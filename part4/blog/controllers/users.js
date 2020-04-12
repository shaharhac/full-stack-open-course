const usersRouter = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");

  return response.status(200).send(users.map(user => user.toJSON()));
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length < 3) {
    throw {
      name: "validationError",
      message: "password must be at least 3 character long"
    };
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash
  });

  await user.save();

  return response.status(200).send(user.toJSON());
});

module.exports = usersRouter;
