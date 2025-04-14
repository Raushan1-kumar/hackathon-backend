const mongoose = require('mongoose')
const medicalInfoSchema = new mongoose.Schema({
    dob: Date,
    gender: String,
    height: Number,
    weight: Number,
    chronicConditions: [String],
    pastSurgeries: [String],
    medicalHistoryNotes: String,
    documents: [{
      type: { type: String }, 
      url: String,
    }],
  }, { _id: false });

  const medical= mongoose.model('MedicalInfo', medicalInfoSchema);
  module.exports = medical;