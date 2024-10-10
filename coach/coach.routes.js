const express = require('express');
const router = express.Router();
const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');
const CoachController= require('./coach.controller');

router.post('/api/coach',  /*auth.authenticateToken, checkRole.checkRole, */CoachController.createCoach);
router.get('/api/coach',  /*auth.authenticateToken, checkRole.checkRole, */CoachController.getAllCoachs );
router.get('/api/coach/:id',  /*auth.authenticateToken, checkRole.checkRole, */CoachController.getCoachById);
router.put('/api/coach/:id',  /*auth.authenticateToken, checkRole.checkRole, */CoachController.updateCoach );
router.delete('/api/coach/:id',  /*auth.authenticateToken, checkRole.checkRole,*/ CoachController.deleteCoach );

module.exports = router;
