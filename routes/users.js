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

/**
 * @openapi
 * /api/users/{id}:
 *  get:
 *    summary: get a user
 *    tags:
 *      - User
 * 
 *    description: get a specifc user by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: a valid mongo id
 *    responses:
 *      200:
 *        description: user found
 *      404:
 *        description: no such user exist
 *      
 */


userRouter.get("/:id", getUserById);

/**
 * @openapi
 * components:
 *  schemas:
 *    creatinguser:
 *      type: object
 *      required:
 *        - firstName
 *        - secondName
 *        - email
 *        - password
 *      example:
 *        firstName: Delyce
 *        secondName: Twizeyimana
 *        email: delyce@gmail.com
 *        password: de125L
 *      properties:
 *        firstName:
 *          type: string
 *          description: your first name
 *        secondName:
 *          type: string
 *          description: your last name
 *        email:
 *          type: string
 *          description: valid email address
 *        password:
 *          type: string
 *          description: strong password required
 * 
 */



/**
 * @openapi
 * /api/users:
 *  post:
 *    summary: create user
 *    tags:
 *      - User
 *    description: user login
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#/components/schemas/creatinguser"
 *    responses:
 *      200:
 *        description: user successfully created
 *
 */

userRouter.post("/", createUser);

/**
 * @openapi
 * /api/users:
 *  get:
 *    summary: get all users
 *    tags:
 *      - User
 *    responses:
 *      200:
 *        description: all users
 */

userRouter.get("/", getAllUsers);

/**
 * @openapi
 * /api/users/{id}:
 *  delete:
 *    security:
 *      - Token: []
 *    summary: delete user
 *    tags:
 *      - User
 *    description: delete user associated with provided ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *    responses:
 *       200:
 *          description: user deleted
 * 
 *    
 *              
 * 
 * 
 */


userRouter.delete("/:id", authenticate, deleteUser);
/**
 * @openapi
 * tags:
 *  name: User
 *
 */

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
 *          type: string
 *          description: A valid email is required
 *        password:
 *          type: string
 *          description: A password
 */


/**
 * @swagger
 * /api/users/login:
 *  post:
 *    summary: user login
 *    tags:
 *      - User
 *    
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/Logininfo"
 *    responses:
 *      200:
 *        description: The user logged in
 */
userRouter.post("/login", loginUser);
/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *    security:
 *      - Token: []
 *    summary: Update a user
 *    tags:
 *      - User
 *    parameters:
 *      - in : path
 *        name: id
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *               firstName:
 *                  type: string
 *            example:
 *                firstName: Delyce
 *    responses:
 *       200:
 *          description: return an updated user
 */
userRouter.put("/:id", authenticate, updateUser);




/**
 * @openapi
 * /api/users/search/{search}:
 *  get:
 *    summary: search a user
 *    tags:
 *      - User
 *    description: type any word to search 
 *    parameters:
 *      - in: path
 *        name: search
 *        required: true
 *        description: type a word to search
 *   
 *    responses:
 *      200:
 *        description: user found
 *      404:
 *        description: no such user exist
 * 
 */

userRouter.get("/search/:search", searchUser);

// userRouter.route("/").post(createUser);
// userRouter.route("/").get(getAllUsers);
// userRouter.route("/:id").delete(deleteUser);
// userRouter.route("/login").post(loginUser);
// userRouter.route("/:id").put(updateUser);
// userRouter.route("/search/:search").get(searchUser);

export default userRouter;
