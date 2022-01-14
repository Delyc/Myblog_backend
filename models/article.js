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
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const Article = mongoose.model("Articles", ArticleSchema);
