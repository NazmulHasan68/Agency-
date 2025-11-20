import express from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/service_controller.js";

const router = express.Router();

router.post("/create", createService);      // Create
router.get("/all", getServices);         // Read all
router.get("/:id", getServiceById);   // Read one
router.put("/:id", updateService);    // Update
router.delete("/:id", deleteService); // Delete

export default router;
