import express from "express";
const queriesRouter = express.Router();

import {
  CreateQuery,
  DeleteQuery,
  GetAllQueries,
  getQueryById,
} from "../controllers/queries.js";

queriesRouter.route("/").post(CreateQuery);
queriesRouter.route("/:id").delete(DeleteQuery);
queriesRouter.route("/").get(GetAllQueries);
queriesRouter.route("/:id").get(getQueryById);



export default queriesRouter;
