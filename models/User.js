import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { token } from "morgan";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name."],
    minlength: 3,
    maxlength: 40,
  },
  email: {
    type: String,
    required: [true, "Please enter an email."],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a vaild email.",
    },
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
    validate: {
      validator: validator.isStrongPassword,
      message: "Please enter a strong password.",
    },
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (inputPassword) {
  const isValid = await bcrypt.compare(inputPassword, this.password);
  return isValid;
};

UserSchema.methods.createToken = function ({ payload }) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_AGE,
  });
};

UserSchema.methods.checkToken = function ({ token }) {
  return jwt.verify(token, process.env.JWT_SECRET);
};
export default mongoose.model("User", UserSchema);
