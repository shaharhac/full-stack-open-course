const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info(`Method ${request.method}`);
  logger.info(`Path: ${request.path}`);
  logger.info(`body: ${JSON.stringify(request.body)}`);
  logger.info(`token: ${request.token ? "true" : "false"}`);
  logger.info("----");
  next();
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.split(" ")[1];
  }

  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unkonwn endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error);

  if ((error.name = "ValidationError")) {
    return response.status(400).send({ error: error.message });
  }
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
};
