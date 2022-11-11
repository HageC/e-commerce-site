import User from "../models/User.js";
import CustomError from "../error/custom-error.js";

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id }).select("-password");
    if (!user) {
      return next(new CustomError(`User with id: ${id} does not exist.`, 404));
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const showUser = async (req, res, next) => {
  res.staus(200).json({ user: req.user });
};

const updateUser = async (req, res, next) => {
  res.send("Update user");
};

const updatePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return next(new CustomError("Enter all values.", 400));
  }

  try {
    const user = await User.findOne({ _id: req.user.id });
    const isValid = await user.comparePassword(currentPassword);
    if (!isValid) {
      return next(new CustomError("Password is incorrect.", 401));
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password has been changed." });
  } catch (error) {
    next(error);
  }
};

export { getUsers, getUser, showUser, updateUser, updatePassword };
