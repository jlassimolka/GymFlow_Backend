const express = require('express');
const router = express.Router();
const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');
const ResponsableController = require('./responsable.controller');

router.post('/api/responsable', /*auth.authenticateToken, checkRole.checkRole,  */ResponsableController.createResponsable);
router.get('/api/responsable',/*  auth.authenticateToken, checkRole.checkRole, */ ResponsableController.getAllResponsables);
router.get('/api/responsable/:id',/* auth.authenticateToken, checkRole.checkRole,  */ResponsableController.getResponsableById);
router.put('/api/responsable/:id',/* auth.authenticateToken, checkRole.checkRole, */ ResponsableController.updateResponsable);
router.delete('/api/responsable/:id',/* auth.authenticateToken, checkRole.checkRole,  */ResponsableController.deleteResponsable);

module.exports = router;
