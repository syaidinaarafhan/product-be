const express = require('express');
const router = express.Router();
const sqlController = require('../controller/sql.controller')


router.get('/getProducts', sqlController.orderHighp);
router.post('/postProduct', sqlController.orderHighp);
router.get('/product/:id', sqlController.populrProductp);
router.put('/product/:id', sqlController.stockStatusp);
router.delete('/product/:id', sqlController.orderMonthp);

module.exports = router;