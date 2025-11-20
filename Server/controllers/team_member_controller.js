import { TeamMember } from "../models/team_member_models.js";
import slugify from "slugify";

// ================== Create a new team member ==================
export const createTeamMember = async (req, res) => {
  try {
    const files = req.files;
    const data = req.body;

    const { email } = req.body;

    // Check duplicate email
    const existingMember = await TeamMember.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ message: "A member with this email already exists" });
    }

    // Parse JSON strings back into objects
    const fieldsToParse = ["skills", "education", "achievements", "certifications", "projects"];
    fieldsToParse.forEach((field) => {
      if (data[field]) {
        try {
          data[field] = JSON.parse(data[field]);
        } catch (err) {
          return res.status(400).json({ error: `${field} is not valid JSON` });
        }
      }
    });

    // Attach uploaded files
    if (files?.photo) data.photo = files.photo[0].filename;
    if (files?.coverImage) data.coverImage = files.coverImage[0].filename;
    if (files?.resume) data.resume = files.resume[0].filename;

    const newMember = new TeamMember(data);
    await newMember.save();

    res.status(201).json({ message: "Team member created successfully", member: newMember });
  } catch (error) {
    console.error("Error creating team member:", error);
    res.status(400).json({ error });
  }
};

// ================== Get all team members ==================
export const getAllTeamMembers = async (req, res) => {
  try {
    const { active, featured, sort } = req.query;

    // Build query filter
    const filter = {};
    if (active) filter.isActive = active === "true";
    if (featured) filter.featured = featured === "true";

    // Fetch members with optional sorting
    const members = await TeamMember.find(filter)
      .sort(sort ? { order: sort === "asc" ? 1 : -1 } : { order: 1 })
      .exec();

    // Send response
    res.status(200).json({
      success: true,
      total: members.length,
      members, // array of team members
    });
  } catch (error) {
    console.error("Error fetching team members:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ================== Get a single member by ID or slug ==================
export const getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await TeamMember.findOne({ $or: [{ _id: id }, { slug: id }] });

    if (!member) return res.status(404).json({ message: "Team member not found" });

    res.status(200).json({ success: true, member });
  } catch (error) {
    console.error("Error fetching team member:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================== Update team member ==================
// ================== Update team member ==================
export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // Parse JSON strings for embedded fields
    const fieldsToParse = ["skills", "education", "achievements", "certifications", "projects"];
    fieldsToParse.forEach((field) => {
      if (updates[field] && typeof updates[field] === "string") {
        try {
          updates[field] = JSON.parse(updates[field]);
        } catch (err) {
          return res.status(400).json({ error: `${field} is not valid JSON` });
        }
      }
    });



    // Update files if uploaded
    if (req.files?.photo) updates.photo = req.files.photo[0].path;
    if (req.files?.coverImage) updates.coverImage = req.files.coverImage[0].path;
    if (req.files?.resume) updates.resume = req.files?.resume[0].path;

    const updatedMember = await TeamMember.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedMember) return res.status(404).json({ message: "Team member not found" });

    res.status(200).json({
      success: true,
      message: "Team member updated successfully",
      member: updatedMember,
    });
  } catch (error) {
    console.error("Error updating team member:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ================== Delete team member ==================
export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = await TeamMember.findByIdAndDelete(id);

    if (!deletedMember) return res.status(404).json({ message: "Team member not found" });

    res.status(200).json({ success: true, message: "Team member deleted successfully" });
  } catch (error) {
    console.error("Error deleting team member:", error);
    res.status(500).json({ message: "Server error" });
  }
};
