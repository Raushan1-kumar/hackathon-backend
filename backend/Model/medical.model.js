const mongoose = require('mongoose');

const medicalInfoSchema = new mongoose.Schema({
  dob: Date,
  gender: String,
  height: Number,
  weight: Number,
  chronicConditions: [String],
  pastSurgeries: [String],
  medicalHistoryNotes: String,
  documents: [{
    _id: false, 
    type: { type: String }, 
    url: String,
  }],
  doctors: [{
    name: { type: String, required: true },
    specialization: String,
    phoneNumber: { type: String, required: true },
    hospital: String,
    email: String
  }],
  relatives: [{
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    isEmergencyContact: { type: Boolean, default: false }
  }]
}, {
  timestamps: true
});

const Medical = mongoose.model('MedicalInfo', medicalInfoSchema);
module.exports = Medical;