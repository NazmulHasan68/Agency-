import express from "express";
import {
  createAchievement,
  getAchievements,
  getAchievement,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achivement_controller.js";
import { upload } from "../utills/multer.js"; // multer setup for file upload

const router = express.Router();

// Routes
router.get("/", getAchievements);
router.get("/:id", getAchievement);
router.post("/", upload.single("logo"), createAchievement);
router.put("/:id", upload.single("logo"), updateAchievement);
router.delete("/:id", deleteAchievement);

export default router;
