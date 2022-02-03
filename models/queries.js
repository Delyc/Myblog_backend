import mongoose from "mongoose";

const QueriesSchema = new mongoose.Schema(
  {
    fullname: {
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

export const Queries = mongoose.model("Queries", QueriesSchema);
