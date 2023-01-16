const express = require('express');

const salesController = require('../controllers/sales.controller');

const validateNewSaleFields = require('../middlewares/validateNewSaleFields');

const router = express.Router();

router.post('/', validateNewSaleFields, salesController.createSale);

router.get('/', salesController.listSales);

router.get('/:id', salesController.getSale);

router.delete('/:id', salesController.removeSale);

module.exports = router;