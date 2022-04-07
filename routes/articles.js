import express from "express";
import {
  createArticle,
  createComment,
  deleteArticle,
  deleteComment,
  getArticleById,
  getComments,
  getLikes,
  likeArticle,
  searchArticle,
  updateArticle,
  viewAllArticles,
} from "../controllers/articles.js";
import { authenticate } from "../middlewares/auth.js";
import {
  handlePostImageUpload,
  upload,
  uploadMiddleware,
} from "../middlewares/upload.js";
import {
  articleValidatio,
  validate,
} from "../validations/articleValidation.js";
const articleRouter = express.Router();

/**
 * @openapi
 * tags:
 *  name: Posts
 */

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
 *    tags:
 *      - Posts
 *    responses:
 *      200:
 *        description: Now
 *
 */

articleRouter.post("/upload", upload.single("image"), handlePostImageUpload);
articleRouter.post(
  "/",
  upload.single("image"),
  articleValidatio(),
  validate,

  uploadMiddleware,
  createArticle
);

articleRouter.get("/search", searchArticle);

/**
 * @openapi
 * /api/articles/{id}:
 *  get:
 *    summary: Allow to get an article by using its ID
 *    tags:
 *      - Posts
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
 *    tags:
 *      - Posts
 *    responses:
 *      200:
 *        description: A list of all posts.
 */
articleRouter.get("/", viewAllArticles);
articleRouter.post("/:id/", createComment);

/**
 * @openapi
 * /api/articles/{id}:
 * put:
 *   summary: update article
 *   tags:
 *      - Posts
 *   descrption: updating
 *   parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description:  a valid article id
 *   response:
 *      200:
 *        description:An article is returned
 *      404:
 *        description:  article doesnot exist
 */

articleRouter.put("/:id", updateArticle);

/**
 * @openapi
 * /api/articles/{id}:
 *  delete:
 *    summary: delete article
 *    tags:
 *      - Posts
 *    description: delete article associated with provided id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *    responses:
 *      200:
 *        description: article deleted
 */
articleRouter.delete("/:id", deleteArticle);

// articleRouter.post("/:id/comments", addComment);

articleRouter.delete("/:id/comments/:user", authenticate, deleteComment);
articleRouter.get("/:id/comments", getComments);
articleRouter.post("/:id/likes", likeArticle);
articleRouter.get("/:id/likes", getLikes);

export default articleRouter;
