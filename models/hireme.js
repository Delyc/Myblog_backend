import mongoose from "mongoose";

const HireSchema = new mongoose.Schema(
  {
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

export const hire = mongoose.model("hireme", HireSchema);
