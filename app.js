import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use(router);

const port = process.env.PORT || "3001";

import userRouter from "./routes/users.js";

app.get("/", (req, res) => {
  res.send("Blog API running!");
});

app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`API Running on Port ${port}`);
});

try {
  console.log("Connecting to MongoDB Atlas cluster...");
  await mongoose.connect(process.env.MONGOURL, {
    useUnifiedTopology: true,
    socketTimeoutMS: 75000,
  });
  console.log("Successfully connected to MongoDB Atlas!");
} catch (error) {
  console.error("Connection to MongoDB Atlas failed!", error);
  process.exit();
}

export default app;
