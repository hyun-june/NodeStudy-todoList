const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);
userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.updatedAt;
  delete obj.createdAt;
  delete obj.__v;
  return obj;
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
