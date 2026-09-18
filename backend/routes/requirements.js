const express = require("express");
const Requirement = require("../models/Requirement");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      eventName,
      eventType,
      dateType,
      startDate,
      endDate,
      location,
      venue,
      category,
      details,
      contactName,
      contactEmail,
      contactPhone,
    } = req.body;

    if (!eventName || !eventType || !startDate || !location || !category) {
      return res.status(400).json({ message: "Please add the required event details." });
    }

    if (!["planner", "performer", "crew"].includes(category)) {
      return res.status(400).json({ message: "That category is not allowed." });
    }

    if (dateType === "range" && !endDate) {
      return res.status(400).json({ message: "Please add an end date." });
    }

    if (dateType === "range" && new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({ message: "End date cannot be before the start date." });
    }

    if (!contactName || !contactEmail) {
      return res.status(400).json({ message: "Contact name and email are required." });
    }

    const newRequirement = new Requirement({
      eventName,
      eventType,
      dateType,
      startDate,
      endDate: dateType === "range" ? endDate : null,
      location,
      venue,
      category,
      contactName,
      contactEmail,
      contactPhone,
    });

    if (category === "planner") {
      newRequirement.plannerDetails = details;
    } else if (category === "performer") {
      newRequirement.performerDetails = details;
    } else {
      newRequirement.crewDetails = details;
    }

    const savedRequirement = await newRequirement.save();
    res.status(201).json(savedRequirement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const requirements = await Requirement.find(filter).sort({ createdAt: -1 });
    res.json(requirements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const requirement = await Requirement.findById(req.params.id);

    if (!requirement) {
      return res.status(404).json({ message: "Requirement not found." });
    }

    res.json(requirement);
  } catch (error) {
    res.status(500).json({ message: "Invalid requirement ID." });
  }
});

module.exports = router;
