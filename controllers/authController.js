import User from "../models/User.js";
import CustomError from "../error/custom-error.js";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new CustomError("Please enter all values.", 400));
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new CustomError("Email is already in use.", 400));
  }

  try {
    const user = await User.create({ name, email, password });
    const tokenUser = { name: user.name, id: user._id, role: user.role };
    const token = user.createToken({ payload: tokenUser });
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 86400000),
    });
    res.status(201).json({ user: tokenUser });
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
