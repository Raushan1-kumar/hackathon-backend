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
});

const Medical = mongoose.model('MedicalInfo', medicalInfoSchema);
module.exports = Medical;
