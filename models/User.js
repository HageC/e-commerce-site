import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
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

export default mongoose.model("User", UserSchema);
