import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

connect();
