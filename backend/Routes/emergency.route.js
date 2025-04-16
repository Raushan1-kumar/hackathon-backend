const express = require('express')
const User =require('../Model/user.model')
const router = express.Router();
const emergencyController = require('../Controller/emergency.controller')


router.post('/add-emergency-detail',emergencyController.add_emergency_info);
router.get('/access-emergency-detail/:uuid',emergencyController.access_emergency_detail);
router.post('/verify-secret',emergencyController.verify_secret);
  module.exports=router;