import { Impact } from "../models/impact_model.js";

// Create
export const createImpact = async (req, res) => {
  try {
    const { title, number, icon, link } = req.body;
    const impact = new Impact({ title, number, icon, link });
    await impact.save();
    res.status(201).json(impact);
  } catch (err) {
    res.status(500).json({ message: "Failed to create impact", error: err.message });
  }
};

// Get all
export const getImpacts = async (req, res) => {
  try {
    const impacts = await Impact.find().sort({ createdAt: -1 });
    res.json(impacts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch impacts", error: err.message });
  }
};

// Get by ID
export const getImpactById = async (req, res) => {
  try {
    const impact = await Impact.findById(req.params.id);
    if (!impact) return res.status(404).json({ message: "Impact not found" });
    res.json(impact);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch impact", error: err.message });
  }
};

// Update
export const updateImpact = async (req, res) => {
  try {
    const { title, number, icon, link } = req.body;
    const impact = await Impact.findByIdAndUpdate(
      req.params.id,
      { title, number, icon, link },
      { new: true }
    );
    if (!impact) return res.status(404).json({ message: "Impact not found" });
    res.json(impact);
  } catch (err) {
    res.status(500).json({ message: "Failed to update impact", error: err.message });
  }
};

// Delete
export const deleteImpact = async (req, res) => {
  try {
    const impact = await Impact.findByIdAndDelete(req.params.id);
    if (!impact) return res.status(404).json({ message: "Impact not found" });
    res.json({ message: "Impact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete impact", error: err.message });
  }
};
