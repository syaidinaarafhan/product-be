const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller')


router.get('/getProducts', productController.getProducts);
router.post('/postProduct', productController.postProduct);
router.get('/product/:id', productController.getProduct);
router.put('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);
router.post('/postOrders', productController.postOrders);
router.get('/getOrders', productController.getOrders);

module.exports = router;