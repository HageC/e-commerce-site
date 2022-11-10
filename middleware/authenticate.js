import CustomError from "../error/custom-error.js";
import jwt from "jsonwebtoken";
const authenticate = (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    return next(new CustomError("You are not authroized to view this.", 401));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { name: payload.name, id: payload.id, role: payload.role };
    next();
  } catch (error) {
    next(new CustomError("You are not authroized to view this.", 401));
  }
};

export const checkPermissions = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new CustomError("You are not authroized to view this.", 401));
  }
  next();
};

export default authenticate;
