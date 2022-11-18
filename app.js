import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cookieParser from "cookie-parser";
import "dotenv/config";
const port = process.env.PORT || 5000;
const app = express();

//app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.get("/", (req, res) => {
  console.log(req.signedCookies);
  res.send("Hello World.");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use(notFound);
app.use(errorHandler);

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

connect();
