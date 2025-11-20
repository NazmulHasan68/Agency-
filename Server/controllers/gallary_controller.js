import { Gallery } from "../models/gallary_model.js";
import { deleteFile } from "../utills/deleteFile.js";

// Create new gallery item
export const createGallery = async (req, res) => {
  try {
    const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

    const gallery = new Gallery({
      title: req.body.title,
      subtitle: req.body.subtitle,
      photo: photoPath,
    });

    const savedGallery = await gallery.save();
    res.status(201).json(savedGallery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all gallery items
export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single gallery item
export const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Gallery item not found" });
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete gallery item
export const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Gallery item not found" });

    // Delete file if exist
    if (gallery.photo) deleteFile(gallery.photo);

    await Gallery.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
