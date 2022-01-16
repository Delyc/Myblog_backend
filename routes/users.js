import express from "express";
import { authenticate } from "../middlewares/auth.js";
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

// userRouter.route("/:id").get(getUserById);
userRouter.get("/:id", getUserById);
userRouter.post("/", authenticate, createUser);
userRouter.get("/",  getAllUsers);
userRouter.delete("/:id", authenticate, deleteUser);
userRouter.post("/login", loginUser);
userRouter.put("/:id", authenticate, updateUser);
userRouter.get("/search/:search", searchUser);



// userRouter.route("/").post(createUser);
// userRouter.route("/").get(getAllUsers);
// userRouter.route("/:id").delete(deleteUser);
// userRouter.route("/login").post(loginUser);
// userRouter.route("/:id").put(updateUser);
// userRouter.route("/search/:search").get(searchUser);

export default userRouter;
