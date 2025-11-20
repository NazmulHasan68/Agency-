import { Journey } from "../models/journey_model.js";

// Create a new Journey
export const createJourney = async (req, res) => {
  try {
    const { title, subtitle, link, date, isActive } = req.body;

    const journey = new Journey({ title, subtitle, link, date, isActive });
    await journey.save();

    res.status(201).json(journey);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create journey", error: err.message });
  }
};

// Get all Journeys
export const getJourneys = async (req, res) => {
  try {
    const journeys = await Journey.find().sort({ createdAt: -1 });
    res.status(200).json(journeys);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch journeys", error: err.message });
  }
};

// Get single Journey by ID
export const getJourneyById = async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);
    if (!journey) return res.status(404).json({ message: "Journey not found" });
    res.status(200).json(journey);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch journey", error: err.message });
  }
};

// Update Journey by ID
export const updateJourney = async (req, res) => {
  try {
    const { title, subtitle, link, date, isActive } = req.body;

    const journey = await Journey.findByIdAndUpdate(
      req.params.id,
      { title, subtitle, link, date, isActive },
      { new: true }
    );

    if (!journey) return res.status(404).json({ message: "Journey not found" });
    res.status(200).json(journey);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update journey", error: err.message });
  }
};

// Delete Journey by ID
export const deleteJourney = async (req, res) => {
  try {
    const journey = await Journey.findByIdAndDelete(req.params.id);
    if (!journey) return res.status(404).json({ message: "Journey not found" });
    res.status(200).json({ message: "Journey deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete journey", error: err.message });
  }
};
