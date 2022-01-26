import express from "express";
const hireRouter = express.Router();

import {
  hireMe
 
} from "../controllers/hireme.js";

hireRouter.route("/").post(hireMe);


export default hireRouter;
