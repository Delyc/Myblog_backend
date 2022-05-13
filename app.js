import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggeroptions } from "./config/base.js";
import { cloudinaryConfig } from "./middlewares/upload.js";
import articleRouter from "./routes/articles.js";
import hireRouter from "./routes/hireme.js";
import queryRouter from "./routes/queries.js";
import userRouter from "./routes/users.js";
import projectRouter from "./routes/projects.js";

const port = process.env.PORT || "3001";
const swaggerOptionsUi = swaggerJSDoc(swaggeroptions);
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cloudinaryConfig);

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerOptionsUi));

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use("/api/users", userRouter);
app.use("/api/articles", articleRouter);
app.use("/api/queries", queryRouter);
app.use("/api/hireme", hireRouter);
app.use("/api/projects", projectRouter);

app.all("*", (req, res) => {
  return res.sendStatus(404);
});
app.listen(port, () => {
  console.log(`API Running on Port ${port}`);
});

try {
  console.log("Connecting to MongoDB Atlas cluster...");
  mongoose.connect(process.env.MONGOURL, {
    useUnifiedTopology: true,
    socketTimeoutMS: 75000,
  });
  console.log("Successfully connected to MongoDB Atlas!");
} catch (error) {
  console.error("Connection to MongoDB Atlas failed!", error);
  process.exit();
}

export default app;
