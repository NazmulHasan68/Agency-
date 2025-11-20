import express from "express";
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/project_controller.js";
import { upload } from "../utills/multer.js";


const router = express.Router();

// Create with image upload
router.post("/",
  upload.fields([
    { name: "projectPhoto", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  createProject
);

router.get("/", getProjects);
router.get("/:id", getProject);
router.put("/:id",
  upload.fields([
    { name: "projectPhoto", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  updateProject
);
router.delete("/:id", deleteProject);

export default router;
