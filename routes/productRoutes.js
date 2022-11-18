import express from "express";
import authenticate from "../middleware/authenticate.js";
import { checkPermissions } from "../middleware/authenticate.js";
import {
  createProduct,
  getProduct,
  getProducts,
  removeProduct,
  editProduct,
  uploadImage,
} from "../controllers/productController.js";
const router = express.Router();

router.post("/create", authenticate, checkPermissions, createProduct);
router.get("/", getProducts);
router.patch("/:id", authenticate, checkPermissions, editProduct);
router.delete("/:id", authenticate, checkPermissions, removeProduct);
router.get("/:id", getProduct);
router.post("/upload", authenticate, checkPermissions, uploadImage);

export default router;
