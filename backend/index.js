import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/taskRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to To-Do List Server!");
});

app.use("/tasks", router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connection is Successful!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
