const express = require('express');
const router = express.Router();
const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');
const DocumentController= require('./document.controller');
const multer = require('multer');
const path = require('path');


router.post('/api/:resources/:id/upload', DocumentController.saveDocument);
router.get('/api/upload/:fileName', DocumentController.getFile);
router.delete('/api/upload/:fileName', DocumentController.deleteFile);



module.exports = router;
