const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  location: String,
  contact: String,
  reason: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
