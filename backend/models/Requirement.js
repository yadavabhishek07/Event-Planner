const mongoose = require("mongoose");

const plannerSchema = new mongoose.Schema(
  {
    servicesNeeded: [String],
    guestCount: Number,
    planningStage: String,
    budget: Number,
    preferredDate: String,
    notes: String,
  },
  { _id: false }
);

const performerSchema = new mongoose.Schema(
  {
    performerType: String,
    genre: String,
    performersRequired: Number,
    durationHours: Number,
    equipmentProvided: [String],
    budget: Number,
    notes: String,
  },
  { _id: false }
);

const crewSchema = new mongoose.Schema(
  {
    crewRoles: [String],
    crewSize: Number,
    shiftTiming: String,
    experienceRequired: String,
    dailyRate: Number,
    notes: String,
  },
  { _id: false }
);

const requirementSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventType: { type: String, required: true },
  dateType: { type: String, default: "single" },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  location: { type: String, required: true },
  venue: { type: String },
  category: {
    type: String,
    required: true,
    enum: ["planner", "performer", "crew"],
  },
  plannerDetails: plannerSchema,
  performerDetails: performerSchema,
  crewDetails: crewSchema,
  contactName: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Requirement", requirementSchema);
