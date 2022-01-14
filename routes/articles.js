import express from "express";
const articleRouter = express.Router();

import {
  createArticle,
  getArticleById,
  viewAllArticles,
  updateArticle,
  deleteArticle,
} from "../controllers/articles.js";

// create routes
articleRouter.route("/").post(createArticle);
articleRouter.route("/:id").get(getArticleById);
articleRouter.route("/").get(viewAllArticles);
articleRouter.route("/:id").put(updateArticle);
articleRouter.route("/:id").delete(deleteArticle);

export default articleRouter;
