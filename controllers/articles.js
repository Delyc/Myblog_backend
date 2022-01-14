import pkg from "http-errors";
const { BadRequest, Conflict, NotFound, Unauthorized } = pkg;

import { Article } from "../models/article.js";

// get one article by id
export const getArticleById = async (req, res) => {
  if (!req.params.id) {
    throw new BadRequest("Missing article id");
  }

  const id = req.params.id;
  const article = await Article.findById(id);

  if (!article) {
    throw new BadRequest("no article exist for this id");
  }
  res.status(200).send(article);
};

// create a new article
export const createArticle = async (req, res) => {
  const title = req.body.title;

  const existingArticle = await Article.findOne({ title: title });

  if (existingArticle) {
    return res.status(400).json({
      success: false,
      message: "An article with this title already exist",
    });
  }

  // create article using req.body
  try {
    const article = await Article.create(req.body);
    res.status(201).json({ success: true, data: article });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something is wrong...",
    });
  }
};

// view all articles
export const viewAllArticles = async (req, res) => {
  const articles = await Article.find();
  res.status(200).send(articles);
};

// update an article
export const updateArticle = async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);

  if (!article) {
    throw new NotFound("No article found");
  }

  const updatedArticle = await Article.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).send(updatedArticle);
};

// delete an article
export const deleteArticle = async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);

  if (!article) {
    throw new NotFound("No article found");
  }

  await Article.findByIdAndDelete(id);
  res.status(200).send({ message: "Article deleted successfully" });
};
