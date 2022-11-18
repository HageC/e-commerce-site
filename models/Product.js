import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please enter a product name"],
    maxlength: [100, "Name cannot be longer than 100 characters."],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
    maxlength: [1000, "Description cannot be longer than 1000 characters"],
  },
  image: {
    type: String,
    default: "/uploads/example.jpeg",
  },
  category: {
    type: String,
    required: [true, "Please enter category"],
    enum: ["bedroom", "office", "kitchen"],
  },
  company: {
    type: String,
    required: [true, "Please enter company"],
    enum: {
      values: ["liddy", "marcos", "ikea"],
      message: "{VALUE} is not available",
    },
  },
  colors: {
    type: [String],
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  freeShipping: {
    type: Boolean,
    default: false,
  },
  stock: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Product", ProductSchema);
