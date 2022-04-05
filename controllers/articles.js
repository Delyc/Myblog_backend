import pkg from "http-errors";
import mongoose from "mongoose";
const Mongoose = mongoose;
const { BadRequest, Conflict, NotFound, Unauthorized } = pkg;

import { Article } from "../models/article.js";
import { Comment } from "../models/article.js";

// get one article by id
export const getArticleById = async (req, res) => {
  if (!req.params.id || !Mongoose.isValidObjectId(req.params.id)) {
    // throw new BadRequest("Missing article id");
    return res.status(400).json({
      success: false,
      data: {
        message: "Missing article id",
      },
    });
  }

  const id = req.params.id;
  const article = await Article.findById(id);

  if (!article) {
    return res.status(400).json({
      success: false,
      data: {
        message: "no article exist for this id",
      },
    });
  }
  let comments = await article.getComments();

  res.status(200).json({
    success: true,
    data: {
      data: article,
      comments: comments,
    },
  });
};

// create a new article
export const createArticle = async (req, res) => {
  const title = req.body.title;

  const existingArticle = await Article.findOne({ title: title });

  if (existingArticle) {
    return res.status(409).json({
      success: false,
      data: {
        message: "A article with this title already exist",
      },
    });
  }

  // create article using req.body
  try {
    let article = req.body;
    article["url"] = req?.file?.path || ""
    console.log(req.body)
    const art = await Article.create(article);
    res.status(201).json({
      success: true,
      data: { message: "Article created successfully" },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: {
        message: "Something is wrong...",
      },
    });
  }
};
//creating comment
export const createComment = async (req, res) => {
  try {
    let commentData = req.body;
    commentData["post"] = req.params.id;
    const comment = await Comment.create(commentData);
    res.status(201).json({
      success: true,
      data: { message: "comment created successfully", comment },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: {
        message: "Something is wrong...",
      },
    });
  }
};

// view all articles
export const viewAllArticles = async (req, res) => {
  const articles = await Article.find();
  return res.status(200).json({
    success: true,
    data: {
      data: articles,
    },
  });
};

// update an article
export const updateArticle = async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);

  if (!article) {
    return res.status(400).json({
      success: false,
      data: {
        message: "No article found",
      },
    });
  }

  const updatedArticle = await Article.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    data: {
      message: "Article successfully updated",
    },
  });
};

// delete an article
export const deleteArticle = async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);

  if (!article) {
    return res.status(400).json({
      success: false,
      data: {
        message: "No article found",
      },
    });
  }

  await Article.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    data: {
      message: "Article deleted successfully",
    },
  });
};

// search for a article using title
export const searchArticle = async (req, res) => {
  const search = req.query.search;
  if (!search) {
    return res.status(404).json({ message: "Not found" });
  }
  try {
    // find all users with firstName that contains search - case insensitive
    const articles = await Article.find({
      title: { $regex: search, $options: "i" },
    });
    // const users = await User.find({ firstName: search });
    // if (articles.length === 0) {
    //   return res.status(404).json({
    //     success: false,
    //     data: {
    //       message: "No article found",
    //     },
    //   });
    // }
    return res.status(200).json({
      success: true,
      data: articles,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// add comment to an article
// export const addComment = async (req, res) => {
//   const id = req.params.id;
//   const article = await Article.findById(id);

//   if (!article) {
//     return res.status(400).json({
//       success: false,
//       data: {
//         message: "No article found",
//       },
//     });
//   }

//   const updatedArticle = await Article.findByIdAndUpdate(id, {
//     $push: { comments: req.body },
//   });

//   res.status(200).json({
//     success: true,
//     data: {
//       message: "comment added successfully",
//       commentUserId: req.body.userId,
//     },
//   });
// };

// delete comment of an article using user id in the comment object
export const deleteComment = async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);

  if (!article) {
    return res.status(400).json({
      success: false,
      data: {
        message: "no article found",
      },
    });
  }

  const updatedArticle = await Article.findByIdAndUpdate(
    id,
    {
      $pull: { comments: { user: req.body.user } },
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: {
      message: "comment deleted successfully",
      commentUserId: req.body.user,
    },
  });
};

// get all comments of an article
export const getComments = async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);

  if (!article) {
    return res.status(404).json({
      success: false,
      data: {
        message: "no article found",
      },
    });
  }

  res.status(200).json({
    success: true,
    data: article.comments,
    count: article.comments.length,
  });
};

// like an article, if user liked the article, unlike it otherwise like it
export const likeArticle = async (req, res) => {
  const id = req.params.id;
  const article = await Article.find({ _id: id });

  if (article.length === 0) {
    return res.status(404).json({
      success: false,
      data: {
        message: "no article found",
      },
    });
  }

  const user = req.body.user;
  const userLiked = article.likes.find((like) => like.user === user);

  if (userLiked) {
    await Article.findByIdAndUpdate(id, {
      $pull: { likes: { user: user } },
    });
  } else {
    await Article.findByIdAndUpdate(id, {
      $push: { likes: req.body },
    });
  }

  res.status(200).json({
    success: true,
    data: article,
  });
};

// get all likes of an article
export const getLikes = async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);

  if (!article) {
    return res.status(404).json({
      success: false,
      data: {
        message: "no article found",
      },
    });
  }

  res.status(200).json({
    success: true,
    data: article.likes,
    count: article.likes.length,
  });
};
