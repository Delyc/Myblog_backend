import express from "express";
const queriesRouter = express.Router();

import {
  CreateQuery,
  DeleteQuery,
  GetAllQueries,
} from "../controllers/queries.js";

queriesRouter.route("/").post(CreateQuery);
queriesRouter.route("/:id").delete(DeleteQuery);
queriesRouter.route("/").get(GetAllQueries);

export default queriesRouter;
