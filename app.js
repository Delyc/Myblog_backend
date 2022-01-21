import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(function(err, req, res, next){
//   res.status(422).send({error: err.message});
// })
// app.use(router);

const port = process.env.PORT || "3001";
import swaggerUi from "swagger-ui-express";
import userRouter from "./routes/users.js";
import articleRouter from "./routes/articles.js";
import queryRouter from "./routes/queries.js";
import { swaggeroptions } from "./config/base.js";
import swaggerJSDoc from "swagger-jsdoc";
const swaggerOptionsUi = swaggerJSDoc(swaggeroptions);
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerOptionsUi));

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use("/api/users", userRouter);
app.use("/api/articles", articleRouter);
app.use("/api/queries", queryRouter);

app.all("*", (req, res)=>{
  return res.sendStatus(404)
})
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
