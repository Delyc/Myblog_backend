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
userRouter.get("/", getAllUsers);
userRouter.delete("/:id", authenticate, deleteUser);
/**
 * @openapi
 * components:
 *  schemas:
 *    Logininfo:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      example:
 *        email: info@me.com
 *        password: Me202220
 *      properties:
 *        email:
 *          type: email
 *          description: A valid email is required
 *        password:
 *          type: string
 *          description: A password
 */

/**
 * openapi
 * /api/users:
 *  post:
 *    summary: login
 *    description: user login
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           #ref: "#/components/schemas/Logininfo"
 *      responses:
 *        200:
 *          description: Loggen in
 *
 */

/**
 * @swagger
 * /api/users/login:
 *  post:
 *    summary: user login
 *    requestBody:
 *     required: true
 *     contents:
 *       application/json:
 *         schema:
 *           #ref: "#/components/schemas/Logininfo"
 */
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
