require("dotenv").config();

const PORT = process.env.PORT;
let MONGO_URL = process.env.MONGO_URL;
let SECRET = process.env.SECRET;

if (process.env.NODE_ENV === "test") {
  MONGO_URL = process.env.TEST_MONGO_URL;
  SECRET = process.env.TEST_SECRET;
}

module.exports = {
  PORT,
  MONGO_URL,
  SECRET
};
