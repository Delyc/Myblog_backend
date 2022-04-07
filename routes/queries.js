import express from "express";
const queriesRouter = express.Router();

import {
  CreateQuery,
  DeleteQuery,
  GetAllQueries,
  getQueryById,
} from "../controllers/queries.js";

/**
 * @openapi
 * tags:
 *  name: Query
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    sendingquery:
 *      type: object
 *      required:
 *        -fullname
 *        -email
 *        -message
 *      example:
 *        fullname: Delyce Twizeyimana
 *        email: delyce@gmail.com
 *        message: Hi, I would like to ask ...
 *      properties:
 *        fullname:
 *          type: string
 *          description: your full name
 *        email:
 *          type: string
 *          description: valid email address
 *        message:
 *          type: string
 *          description: your query here
 * 
 */





/**
 * @openapi
 * /api/queries:
 *  post:
 *    summary: contact me
 *    tags:
 *      - Query
 *    description: send me your query
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/sendingquery"
 *    responses:
 *      200:
 *        description: Received, I will get back to you soon
 * 
 */



queriesRouter.route("/").post(CreateQuery);


queriesRouter.route("/:id").delete(DeleteQuery);
queriesRouter.route("/").get(GetAllQueries);
queriesRouter.route("/:id").get(getQueryById);



export default queriesRouter;
