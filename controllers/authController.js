import User from "../models/User.js";
import CustomError from "../error/custom-error.js";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new CustomError("Please enter all values.", 400));
  }
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  res.send("Login");
};

const logout = async (req, res, next) => {
  res.send("Logout");
};

export { register, login, logout };
