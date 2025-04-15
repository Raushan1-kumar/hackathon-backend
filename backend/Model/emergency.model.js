const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const emrgencyInfoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    secretKey: { type: String, required: true },
    allergies: [String],
    medications: [String],
    emergencyContact: {
      name: String,
      phone: String,
      relation: String,
    },
    doctorContact: {
      name: String,
      phone: String,
      hospital: String,
    },
    emergencyUUID: {
      type: String,
      default: uuidv4,
      unique: true,
    },
  },
  { timestamps: true }
);

const Emergency = mongoose.model("Emergency", emrgencyInfoSchema);
module.exports = Emergency;
