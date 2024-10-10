const express = require('express');
const router = express.Router();
const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');
const ManagerController= require('./manager.controller');

router.post('/api/manager',  /*auth.authenticateToken, checkRole.checkRole, */ManagerController.createManager);
router.get('/api/manager',  /*auth.authenticateToken, checkRole.checkRole, */ManagerController.getAllManagers);
router.get('/api/manager/:id',  /*auth.authenticateToken, checkRole.checkRole, */ManagerController.getManagerById);
router.put('/api/manager/:id',  /*auth.authenticateToken, checkRole.checkRole, */ManagerController.updateManager );
router.delete('/api/manager/:id',  /*auth.authenticateToken, checkRole.checkRole,*/ ManagerController.deleteManager  );

module.exports = router;
