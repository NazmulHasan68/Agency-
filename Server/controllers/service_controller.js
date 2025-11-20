import { Service } from "../models/services_model.js";


// Create a new service
export const createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a service
// Update a service
export const updateService = async (req, res) => {
  try {
    // If features come as a comma-separated string, convert it into an array
    if (typeof req.body.features === "string") {
      req.body.features = req.body.features.split(",").map((f) => f.trim());
    }

    // If the frontend sends features inside an array with one big comma string
    // e.g. ["this,is,nazmul,hasan,hello"]
    if (
      Array.isArray(req.body.features) &&
      req.body.features.length === 1 &&
      req.body.features[0].includes(",")
    ) {
      req.body.features = req.body.features[0]
        .split(",")
        .map((f) => f.trim());
    }

    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete a service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
