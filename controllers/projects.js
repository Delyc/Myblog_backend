import pkg from "http-errors";
import mongoose from "mongoose";
const Mongoose = mongoose;
import { project } from "../models/projects.js";

export const createProject = async (req, res) => {
    const proname = req.body.proname;
  
    const existingProject = await project.findOne({ proname: proname });
  
    if (existingProject) {
      return res.status(409).json({
        success: false,
        data: {
          message: "A project with this title already exist",
        },
      });
    }
  

    try {
      let proj = req.body;
      proj["url"] = req?.file?.path || ""
      console.log(req.body)
      const art = await project.create(proj);
      res.status(201).json({
        success: true,
        data: { message: "project added successfully" },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        data: {
          message: "Something is wrong...",
        },
      });
    }
  };

  export const getProjects = async (req, res) => {
    const proj = await project.find();
    return res.status(200).json({
      success: true,
      data: {
        data: proj,
      },
    });
  };