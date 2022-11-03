import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import authRouter from "./routes/authRoutes.js";
import "dotenv/config";
const port = process.env.PORT || 5000;
const app = express();

//app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World.");
});

app.use("/api/auth", authRouter);

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
