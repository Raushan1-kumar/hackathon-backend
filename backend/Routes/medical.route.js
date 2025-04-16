const express = require('express')
const medicalController = require('../Controller/medical.controller')
const router = express.Router();



router.post('/medical-info/add',medicalController.add_medical_info);
router.get('/medical-info/access',medicalController.access_medical_info);
router.patch('/medical-info/update',medicalController.update_medical_info);
router.post('/medical-history',medicalController.addMedicalHistory);
router.get('/get-medical-history',medicalController.getMedicalHistory);

module.exports=router;