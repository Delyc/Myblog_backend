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

// create routes

articleRouter.post("/", authenticate, createArticle);
articleRouter.get("/:id", getArticleById);
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
