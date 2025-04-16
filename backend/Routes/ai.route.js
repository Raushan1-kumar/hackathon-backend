const express = require('express');
const aiController= require('../Controller/ai.controller')
const router = express.Router();


router.post('/get-healthylife-detail', aiController.generate_healthylife_detail)

module.exports= router;