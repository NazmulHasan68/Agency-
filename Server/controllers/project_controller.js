import { Project } from "../models/project_model.js";
import fs from "fs";
import path from "path";

// Helper to delete files
const deleteFile = (filePath) => {
  if (filePath) {
    const fullPath = path.join("public", filePath.replace("/uploads/", "uploads/"));
    fs.unlink(fullPath, (err) => {
      if (err) console.log("Failed to delete file:", fullPath);
    });
  }
};

// CREATE project
export const createProject = async (req, res) => {
  try {
    const { type, title, subtitle, projectLink, clientName, description, technologies } = req.body;

    const projectPhoto = req.files?.projectPhoto
      ? `/uploads/${req.files.projectPhoto[0].filename}`
      : null;

    const gallery = req.files?.gallery
      ? req.files.gallery.map((file) => `/uploads/${file.filename}`)
      : [];

    const newProject = await Project.create({
        type,
        title,
        subtitle,
        projectPhoto,
        gallery,
        projectLink,
        clientName,
        description,
        technologies: Array.isArray(technologies)
            ? technologies
            : technologies
            ? technologies.split(",").map((t) => t.trim())
            : [],
        });

    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single project
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE project (with old photo delete)
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const updateData = { ...req.body };

    // If new projectPhoto uploaded → delete old one
    if (req.files?.projectPhoto) {
      if (project.projectPhoto) deleteFile(project.projectPhoto);
      updateData.projectPhoto = `/uploads/${req.files.projectPhoto[0].filename}`;
    }

    // If new gallery uploaded → delete old gallery
    if (req.files?.gallery) {
      if (project.gallery?.length) {
        project.gallery.forEach((img) => deleteFile(img));
      }
      updateData.gallery = req.files.gallery.map((file) => `/uploads/${file.filename}`);
    }

    // Fix technologies: handle both string and array
    if (updateData.technologies) {
      updateData.technologies = Array.isArray(updateData.technologies)
        ? updateData.technologies
        : updateData.technologies.split(",").map((t) => t.trim());
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// DELETE project (with photo delete)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Delete projectPhoto
    if (project.projectPhoto) {
      deleteFile(project.projectPhoto);
    }

    // Delete gallery photos
    if (project.gallery?.length) {
      project.gallery.forEach((img) => deleteFile(img));
    }

    await project.deleteOne();
    res.json({ message: "Project and related images deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
