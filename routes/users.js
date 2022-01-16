import express from "express";
const userRouter = express.Router();

import {
  createUser,
  getUserById,
  getAllUsers,
  deleteUser,
  loginUser,
  updateUser,
  searchUser,
} from "../controllers/users.js";

userRouter.route("/:id").get(getUserById);
userRouter.route("/").post(createUser);
userRouter.route("/").get(getAllUsers);
userRouter.route("/:id").delete(deleteUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/:id").put(updateUser);
userRouter.route("/search/:search").get(searchUser);

export default userRouter;
