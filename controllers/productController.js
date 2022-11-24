import CustomError from "../error/custom-error.js";
import Product from "../models/Product.js";

const createProduct = async (req, res) => {
  req.body.user = req.user.id;
  try {
    const product = Product.create(req.body);
    res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products, length: products.length });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res) => {
  res.send(".");
};

const editProduct = async (req, res) => {
  res.send(".");
};

const removeProduct = async (req, res) => {
  res.send(".");
};

const uploadImage = async (req, res) => {
  res.send(".");
};

export {
  createProduct,
  getProducts,
  getProduct,
  editProduct,
  removeProduct,
  uploadImage,
};
