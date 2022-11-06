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
router.route("/updateUser").post(updateUser);
router.route("/updatePassword").post(updatePassword);
router.route("/:id").get(getUser);

export default router;
