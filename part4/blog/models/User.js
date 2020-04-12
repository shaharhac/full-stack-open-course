const mongoose = require("mongoose");
const UniqueVladitor = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, minlength: 3 },
  name: String,
  passwordHash: String,
  blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog" }]
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

userSchema.plugin(UniqueVladitor);

const User = mongoose.model("User", userSchema);

module.exports = User;
