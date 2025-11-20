import express from "express";
import multer from "multer";
import path from "path";
import {
  createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/team_member_controller.js";

const router = express.Router();

// --------------------
// Multer setup
// --------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // folder to store files
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  },
});

// Accept multiple fields
const upload = multer({ storage });

const multipleUpload = upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

// --------------------
// Routes
// --------------------

// CREATE
router.post("/create", multipleUpload, createTeamMember);

// READ
router.get("/all", getAllTeamMembers);
router.get("/:id", getTeamMemberById);

// UPDATE
router.put("/:id", multipleUpload, updateTeamMember);

// DELETE
router.delete("/:id", deleteTeamMember);

export default router;
