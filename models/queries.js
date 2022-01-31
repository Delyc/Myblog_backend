import mongoose from "mongoose";

const QueriesSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    
      required: true,
    },
    Email: {
      type: String,
      
      required: true,
    },
    message: {
      type: String,
      minlength: 10,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const Queries = mongoose.model("Queries", QueriesSchema);
