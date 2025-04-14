const mongoose = require('mongoose')



const emrgencyInfoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bloodGroup: { type: String, required: true },
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
  }, { _id: false });

const emergency=mongoose.model('Emergency',emrgencyInfoSchema);
module.exports= emergency;