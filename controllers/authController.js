import User from "../models/User.js";
import CustomError from "../error/custom-error.js";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new CustomError("Please enter all values.", 400));
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new CustomError("Email is already in use.", 400));
    }

    const user = await User.create({ name, email, password });
    const tokenUser = { name: user.name, id: user._id, role: user.role };
    const token = user.createToken({ payload: tokenUser });
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 86400000),
      secure: process.env.NODE_ENV === "production",
      signed: true,
    });

    res.status(201).json({ user: tokenUser });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomError("Please enter all values.", 400));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new CustomError("Email doesn't exist.", 400));
    }

    const validPassword = await user.comparePassword(password);

    if (!validPassword) {
      return next(new CustomError("Password is invalid.", 401));
    }

    const tokenUser = { name: user.name, id: user._id, role: user.role };
    const token = user.createToken({ payload: tokenUser });
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 86400000),
      secure: process.env.NODE_ENV === "production",
      signed: true,
    });

    res.status(201).json({ user: tokenUser });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(Date.now()) });
  res.status(200).json({ messsage: "User has logged out." });
};

export { register, login, logout };
