import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        proname: {
          type: String,
          required: true,
          unique: true,
          
        },
    
        proexpl: {
          type: String,
          required: true,
          
        },
        url: {
          type: String,
        },
        github:{
          type:String,
        },
        live:{
          type: String,
        }

    

  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const project = mongoose.model("project", projectSchema);
