import { Partner } from "../models/partner_model.js";
import { deleteFile } from "../utills/deleteFile.js";

// CREATE Partner
export const createPartner = async (req, res) => {
  try {
    const { company, email, phone, website, description, isActive } = req.body;

    const logo = req.file ? `/uploads/${req.file.filename}` : null;

    const newPartner = await Partner.create({
      company,
      email,
      phone,
      website,
      description,
      logo,
      isActive: isActive ?? true,
    });

    res.status(201).json(newPartner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET All Partners
export const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Single Partner
export const getPartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });
    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Partner
export const updatePartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    const { company, email, phone, website, description, isActive } = req.body;

    // If new logo uploaded → delete old one
    if (req.file && partner.logo) deleteFile(partner.logo);

    partner.company = company ?? partner.company;
    partner.email = email ?? partner.email;
    partner.phone = phone ?? partner.phone;
    partner.website = website ?? partner.website;
    partner.description = description ?? partner.description;
    partner.isActive = isActive ?? partner.isActive;
    if (req.file) partner.logo = `/uploads/${req.file.filename}`;

    const updatedPartner = await partner.save();
    res.json(updatedPartner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE Partner
export const deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    if (partner.logo) deleteFile(partner.logo);

    await Partner.findByIdAndDelete(req.params.id);
    res.json({ message: "Partner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
