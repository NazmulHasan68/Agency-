import express from "express";
import {
  createPartner,
  getPartners,
  getPartner,
  updatePartner,
  deletePartner,
} from "../controllers/partner_controller.js";
import { upload } from "../utills/multer.js";

const router = express.Router();

// Routes
router.get("/", getPartners);
router.get("/:id", getPartner);
router.post("/", upload.single("logo"), createPartner);
router.put("/:id", upload.single("logo"), updatePartner);
router.delete("/:id", deletePartner);

export default router;
