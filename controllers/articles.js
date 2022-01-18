import pkg from "http-errors";
const { BadRequest, Conflict, NotFound, Unauthorized } = pkg;

import { Article } from "../models/article.js";
// import { uploadPhoto } from "../utilities/util.js";

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
    // upload 
    res.status(201).json({ success: true, data: article });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//uploading image
const uploadDishPhoto = async (req, res) => {
  if (!req.params.id) {
	return res.status(400).json({ 
    success: false, message: "Provide article id"});
  };

  const allResults = [];
  for (let file of req.files) {
	const result = await uploadPhoto(file, options);
	allResults.push({
  	url: result.url,
  	publicId: result.public_id,
	});
  }
  await Article.findByIdAndUpdate(
	req.params.id,
	{
  	$push: {
    	images: {
      	$each: allResults,
    	},
  	},
	},
	{
  	new: true,
	}
  );
  res.status(200).json({ success: true, data: allResults });
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

// search for a user using firstName
export const searchArticle = async (req, res) => {
  const search = req.params.search;
  try {
    // find all users with firstName that contains search - case insensitive
    const articles = await Article.find({ title: { $regex: search, $options: "i" } });
    // const users = await User.find({ firstName: search });
    if (articles.length === 0) {
      res.status(404).json({
        success: false,
        message: "no user found",
      });
    }
    res.status(200).json({
      success: true,
      data: articles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// add comment to an article
export const addComment = async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);

  if (!article) {
    throw new NotFound("No article found");
  }

  const updatedArticle = await Article.findByIdAndUpdate(id, {
    $push: { comments: req.body },
  });

  res.status(200).json({
    success: true,
    data: updatedArticle,
  });
};

// delete comment of an article using user id in the comment object
export const deleteComment = async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);

  if (!article) {
    throw new NotFound("No article found");
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
    data: updatedArticle,
  });
};

// get all comments of an article
export const getComments = async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);

  if (!article) {
    throw new NotFound("No article found");
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
  const article = await Article.findById(id);

  if (!article) {
    throw new NotFound("No article found");
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
}

// get all likes of an article
export const getLikes = async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);

  if (!article) {
    throw new NotFound("No article found");
  }

  res.status(200).json({
    success: true,
    data: article.likes,
    count: article.likes.length,
  });
};

