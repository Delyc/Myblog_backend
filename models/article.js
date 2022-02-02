import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Articles",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const Comment = mongoose.model("Comments", CommentSchema);

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
    },
    hook: {
      type: String,
      required: true,
      minlength: 20,
    },
    content: {
      type: String,
      required: true,
      minlength: 50,
    },
    banner: {
      type: String,
      required: [true, "banner required"],
    },

    likes: {
      type: Array,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
ArticleSchema.index({ title: "text" });
ArticleSchema.methods.getComments = async function ()  {
  let post = this;
  const comments = await Comment.find({ post: post._id });
  return comments
};

ArticleSchema.methods.addComment = async function (data){
  let post = this;
  data['post']= post._id;
  try {
    let newComment = await Comment.create(data)
    return newComment
  } catch (error) {
    return error
  }
 
}

export const Article = mongoose.model("Articles", ArticleSchema);
