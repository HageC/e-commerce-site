import express from "express";
import {
  getUsers,
  getUser,
  showUser,
  updateUser,
  updatePassword,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getUsers);
router.route("/show").get(showUser);
router.route("/updateUser").patch(updateUser);
router.route("/updatePassword").patch(updatePassword);
router.route("/:id").get(getUser);

export default router;
