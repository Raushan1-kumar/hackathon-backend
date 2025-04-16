const mongoose = require('mongoose');

const medicalHistorySchema = new mongoose.Schema({
  // 🧪 Allergies
  allergies: [{
    allergen: { type: String, required: true },
    allergyType: { type: String, enum: ['Food', 'Drug', 'Environmental', 'Other'], default: 'Other' },
    reaction: String,
    severity: { type: String, enum: ['Mild', 'Moderate', 'Severe'], default: 'Mild' },
    notedAt: { type: Date, default: Date.now }
  }],

  // 💊 Medications
  medications: [{
    name: { type: String, required: true },
    dosage: String,
    frequency: String,
    purpose: String,
    prescribedBy: String,
    startDate: Date,
    endDate: Date
  }],

  // 🦠 Chronic Conditions
  chronicConditions: [{
    conditionName: { type: String, required: true },
    diagnosisDate: Date,
    treatment: String,
    status: { type: String, enum: ['Active', 'In Remission', 'Resolved'], default: 'Active' }
  }],

  // 🩹 Surgeries
  surgeries: [{
    name: { type: String, required: true },
    date: Date,
    outcome: String,
    hospital: String,
    doctor: String
  }],

  // 💉 Vaccinations
  vaccinations: [{
    vaccineName: { type: String, required: true },
    doseDate: Date,
    boosterDate: Date,
    notes: String
  }],

  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MedicalHistory', medicalHistorySchema);
