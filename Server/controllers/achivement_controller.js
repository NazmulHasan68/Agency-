import { Achievements } from "../models/achievements_mode.js";
import { deleteFile } from "../utills/deleteFile.js";

// CREATE Achievement
export const createAchievement = async (req, res) => {
  try {
    const { title, description, type, isActive } = req.body;
    const logo = req.file ? `/uploads/${req.file.filename}` : null;

    const newAchievement = await Achievements.create({
      title,
      description,
      type,
      logo,
      isActive: isActive ?? true,
    });

    res.status(201).json(newAchievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET All Achievements
export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievements.find().sort({ createdAt: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Single Achievement
export const getAchievement = async (req, res) => {
  try {
    const achievement = await Achievements.findById(req.params.id);
    if (!achievement) return res.status(404).json({ message: "Achievement not found" });
    res.json(achievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Achievement
export const updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievements.findById(req.params.id);
    if (!achievement) return res.status(404).json({ message: "Achievement not found" });

    const { title, description, type, isActive } = req.body;

    // If new logo uploaded → delete old one
    if (req.file && achievement.logo) deleteFile(achievement.logo);

    achievement.title = title ?? achievement.title;
    achievement.description = description ?? achievement.description;
    achievement.type = type ?? achievement.type;
    achievement.isActive = isActive ?? achievement.isActive;
    if (req.file) achievement.logo = `/uploads/${req.file.filename}`;

    const updatedAchievement = await achievement.save();
    res.json(updatedAchievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE Achievement
export const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievements.findById(req.params.id);
    if (!achievement) return res.status(404).json({ message: "Achievement not found" });

    if (achievement.logo) deleteFile(achievement.logo);

    await Achievements.findByIdAndDelete(req.params.id);
    res.json({ message: "Achievement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
