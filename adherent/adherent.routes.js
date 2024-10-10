const express = require('express');
const router = express.Router();
const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');
const AdherentController= require('./adherent.controller');

router.post('/api/adherent',  /*auth.authenticateToken, checkRole.checkRole, */AdherentController.createAdherent );
router.get('/api/adherent',  /*auth.authenticateToken, checkRole.checkRole, */AdherentController.getAllAdherents);
router.get('/api/adherent/:id',  /*auth.authenticateToken, checkRole.checkRole, */AdherentController.getAdherentById);
router.put('/api/adherent/:id',  /*auth.authenticateToken, checkRole.checkRole, */AdherentController.updateAdherent );
router.delete('/api/adherent/:id',  /*auth.authenticateToken, checkRole.checkRole,*/ AdherentController.deleteAdherent );

module.exports = router;
