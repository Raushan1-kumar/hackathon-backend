const bloodController = require('../Controller/blood.controller');
const express = require('express');
const router = express.Router();

router.post("/blood-request",bloodController.add_blood_request);
router.get("/blood-requests/list",bloodController.get_blood_request);

module.exports= router;