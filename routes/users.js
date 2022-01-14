import express from "express";
const userRouter = express.Router();

import { createUser, getUserById } from "../controllers/users.js";

userRouter.route("/:id").get(getUserById);
userRouter.route("/").post(createUser);

export default userRouter;
