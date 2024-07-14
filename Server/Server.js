import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import textTaskRoute from "./routes/textTaskRoute.js";
import listTaskRoute from "./routes/listTaskRoute.js";
import taskRoute from "./routes/taskRoute.js";

const app = express();
dotenv.config();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.LOCAL_MONGODB)
  .then(() => {
    console.log("Connected to MONGO DB");
  })
  .catch(() => {
    console.log("Failed to connect to MONGODB");
  });

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MONGO DB");
});

//Routes
app.use("/auth", authRoute);
app.use("/category", categoryRoute);
app.use("/task", taskRoute);
app.use("/task/text", textTaskRoute);
app.use("/task/list", listTaskRoute);

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went wrong!";
  return res
    .status(errorStatus)
    .json({ success: false, message: errorMessage });
});

app.listen(process.env.PORT, () => {
  console.log("Listening to Port", process.env.PORT);
});
