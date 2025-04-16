const mongoose = require('mongoose')

const MedicalRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  dob:{type:Date},
  age: Number,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  height: Number,
  weight: Number, 

 
  bloodPressure: String, 
  heartRate: Number, 

  chronicDiseases:{type:String},
  surgeries:{type:String}, 
   document:{type:String},

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const medical =mongoose.model('Medical', MedicalRecordSchema);
module.exports=medical;
