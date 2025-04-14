const express = require('express')
const User =require('../Model/user.model')
const router = express.Router();



router.get('/:uuid', async (req, res) => {
    const user = await User.findOne({ emergencyUUID: req.params.uuid });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({
      name: user.name,
      bloodType: user.bloodType,
      allergies: user.allergies,
      medications: user.medications,
      emergencyContact: user.emergencyContact,
      doctorContact: user.doctorContact,
    });
  });
  