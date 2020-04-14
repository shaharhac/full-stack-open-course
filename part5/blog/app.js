const express = require("express");
const app = express();
require("express-async-errors");
const mongoose = require("mongoose");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logger = require("./utils/logger");
const config = require("./utils/config");
const middlewares = require("./utils/middlewares");

logger.info(`connecting to ${config.MONGO_URL}`);

mongoose
  .connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    logger.info("connected to Mongodb");
  })
  .catch(error => {
    logger.error(`error connecting to db: ${error.message}`);
  });

app.use(cors());
app.use(express.json());
app.use(middlewares.tokenExtractor);
app.use(middlewares.requestLogger);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testRouter = require("./controllers/tests");
  app.use("/api/testing", testRouter);
}

app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

module.exports = app;
