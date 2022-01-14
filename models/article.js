import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    hook: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    banner: {
      type: String,
      required: true,
    },
    images: {
        type: 
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const Article= mongoose.model("Articles", ArticleSchema);
