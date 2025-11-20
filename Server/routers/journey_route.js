import express from "express";
import multer from "multer";
import { 
  getJourneys, 
  getJourneyById, 
  createJourney, 
  updateJourney, 
  deleteJourney 
} from "../controllers/journey_controller.js";

const router = express.Router();
const upload = multer(); // Parse FormData (no files)

router.get("/", getJourneys);               
router.get("/:id", getJourneyById);         
router.post("/", upload.none(), createJourney); 
router.put("/:id", upload.none(), updateJourney);
router.delete("/:id", deleteJourney);       

export default router;
