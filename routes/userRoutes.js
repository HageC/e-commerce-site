import express from "express";
import authenticate from "../middleware/authenticate.js";
import { checkPermissions } from "../middleware/authenticate.js";
import {
  getUsers,
  getUser,
  showUser,
  updateUser,
  updatePassword,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(authenticate, checkPermissions, getUsers);
router.route("/show").get(authenticate, showUser);
router.route("/updateUser").patch(updateUser);
router.route("/updatePassword").patch(authenticate, updatePassword);
router.route("/:id").get(authenticate, getUser);

export default router;
