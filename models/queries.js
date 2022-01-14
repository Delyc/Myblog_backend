import mongoose from "mongoose";

const QueriesSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      minlength: 10,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const Queries = mongoose.model("Queries", QueriesSchema);
