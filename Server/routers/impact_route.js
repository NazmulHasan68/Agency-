import express from "express";
import {
  createImpact,
  getImpacts,
  getImpactById,
  updateImpact,
  deleteImpact,
} from "../controllers/impact_controller.js";

const router = express.Router();

router.get("/", getImpacts);
router.get("/:id", getImpactById);
router.post("/", createImpact);
router.put("/:id", updateImpact);
router.delete("/:id", deleteImpact);

export default router;
