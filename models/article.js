import mongoose from "mongoose";

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
      required: [true, 'banner required']
    },
    images: {
      type: Array,
      required: true,
    },
    comments: {
      type: Array,
    },
    likes: {
      type: Array,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
ArticleSchema.index({title: 'text'})

export const Article = mongoose.model("Articles", ArticleSchema);
