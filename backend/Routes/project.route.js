const express = require('express');
const router = express.Router();
const project_controller = require('../Controller/project.controller');
const { isAuthenticated } = require('../auth/isAuthentic');

router.post('/add-project', isAuthenticated, project_controller.createProject);
router.get('/get-projects', isAuthenticated, project_controller.getUserProjects); // <-- Added auth here too

module.exports = router;