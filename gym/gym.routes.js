const express = require('express');
const router = express.Router();
const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');
const GymController = require('./gym.controller');

router.post('/api/gym', /*auth.authenticateToken, checkRole.checkRoauth.authenticateToken, checkRole.checkRole,le, */GymController.createGym);
router.get('/api/gym',/* auth.authenticateToken, checkRole.checkRole,*/ GymController.getAllGyms);
router.get('/api/gym/:id',/* auth.authenticateToken, checkRole.checkRole,*/ GymController.getGymById);
router.put('/api/gym/:id',/* auth.authenticateToken, checkRole.checkRole,*/ GymController.updateGym);
router.delete('/api/gym/:id', /*auth.authenticateToken, checkRole.checkRole,*/GymController.deleteGym);

router.get('/api/gym/:id/adherent',/* auth.authenticateToken, checkRole.checkRole,*/ GymController.getAdherentByGym);

module.exports = router;
