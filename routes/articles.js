import express from "express";
const articleRouter = express.Router();
import { authenticate } from "../middlewares/auth.js";

import {
  createArticle,
  getArticleById,
  viewAllArticles,
  updateArticle,
  deleteArticle,
  searchArticle,
  addComment,
  deleteComment,
  getComments,
  likeArticle,
  getLikes,
} from "../controllers/articles.js";

/**
 * @openapi
 * components:
 *  securitySchemes:
 *    Token:
 *      type: http
 *      scheme: Bearer
 *
 */
// create routes

/**
 * @openapi
 * /api/articles:
 *  post:
 *    security:
 *      - Token: []
 *    summary: Aloow a user to create a post
 *
 */

articleRouter.post("/", authenticate, createArticle);

/**
 * @openapi
 * /api/articles/{id}:
 *  get:
 *    summary: Allow to get an article by using its ID
 *    description: Allow............
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: A valid mongo db id
 *    responses:
 *      200:
 *        description: An article is returned
 *      404:
 *        description: artcile doesnot exist
 *
 *
 */

articleRouter.get("/:id", getArticleById);
/**
 * @openapi
 * /api/articles:
 *  get:
 *    summary: Get a list of all articles
 *    responses:
 *      200:
 *        description: A list of all posts.
 */
articleRouter.get("/", viewAllArticles);
articleRouter.put("/:id", authenticate, updateArticle);
articleRouter.delete("/:id", authenticate, deleteArticle);
articleRouter.get("/search/:search", searchArticle);
articleRouter.post("/:id/comments", addComment);
articleRouter.delete("/:id/comments/:user", authenticate, deleteComment);
articleRouter.get("/:id/comments", getComments);
articleRouter.post("/:id/likes", likeArticle);
articleRouter.get("/:id/likes", getLikes);

// articleRouter.route("/").post(createArticle);
// articleRouter.route("/:id").get(getArticleById);
// articleRouter.route("/").get(viewAllArticles);
// articleRouter.route("/:id").put(updateArticle);
// articleRouter.route("/:id").delete(deleteArticle);
// articleRouter.route("/search/:search").get(searchArticle);
// articleRouter.route("/:id/comments").post(addComment);
// articleRouter.route("/:id/comments/:user").delete(deleteComment);
// articleRouter.route("/:id/comments").get(getComments);
// articleRouter.route("/:id/likes").post(likeArticle);
// articleRouter.route("/:id/likes").get(getLikes);

export default articleRouter;
