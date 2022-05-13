import express from "express";
import { createProject, getProjects } from "../controllers/projects.js";
import {
    handlePostImageUpload,
    upload,
    uploadMiddleware,
  } from "../middlewares/upload.js";

  const projectRouter = express.Router();
  projectRouter.post("/upload", upload.single("image"), handlePostImageUpload);
projectRouter.post(
  "/",
  upload.single("image"),
  uploadMiddleware,
  createProject
);
projectRouter.get("/", getProjects);

export default projectRouter;

