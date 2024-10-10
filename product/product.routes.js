const express = require('express');
const router = express.Router();
const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');
const ProductController = require('./product.controller');

router.post('/api/product', auth.authenticateToken, checkRole.checkRole, ProductController.createProduct);
router.get('/api/product', auth.authenticateToken, checkRole.checkRole, ProductController.getAllProducts);
router.get('/api/product/:id', auth.authenticateToken, checkRole.checkRole, ProductController.getProductById);
router.put('/api/product/:id', auth.authenticateToken, checkRole.checkRole, ProductController.updateProduct);
router.delete('/api/product/:id', auth.authenticateToken, checkRole.checkRole, ProductController.deleteProduct);

module.exports = router;
