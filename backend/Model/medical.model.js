const mongoose = require("mongoose");

const medicalModel = new mongoose.Schema({
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

module.exports = mongoose.model("Medical", medicalModel);
