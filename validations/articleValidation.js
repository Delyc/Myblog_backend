import { body, validationResult } from "express-validator";
import { Article } from "../models/article.js";

export const articleValidatio = () => [
  body("title", "Title is required too.")
    .notEmpty()
    .isLength({ min: 10 })
    .bail()
    .custom(async (title) => {
      const existingArticle = await Article.findOne({ title: title });
      if (existingArticle) return Promise.reject("This title exists already");
    }),
  body("hook", "This too is required").notEmpty().isLength({ min: 10 }),
  body("content", "Mind the lentgh of 10").notEmpty().isLength({
    min: 10,
  }),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  const extractedErrors = {};
  errors.array().forEach((err) => {
    extractedErrors[err.param] = err.msg;
  });
  console.log(errors)
  return res.status(400).json(extractedErrors);
};
