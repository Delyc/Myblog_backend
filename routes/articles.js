import express from "express";
const articleRouter = express.Router();

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
articleRouter.route("/").post(createArticle);
articleRouter.route("/:id").get(getArticleById);
articleRouter.route("/").get(viewAllArticles);
articleRouter.route("/:id").put(updateArticle);
articleRouter.route("/:id").delete(deleteArticle);
articleRouter.route("/search/:search").get(searchArticle);
articleRouter.route("/:id/comments").post(addComment);
articleRouter.route("/:id/comments/:user").delete(deleteComment);
articleRouter.route("/:id/comments").get(getComments);
articleRouter.route("/:id/likes").post(likeArticle);
articleRouter.route("/:id/likes").get(getLikes);

export default articleRouter;
