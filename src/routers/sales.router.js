const express = require('express');

const salesController = require('../controllers/sales.controller');

const validateNewSaleFields = require('../middlewares/validateNewSaleFields');

const router = express.Router();

router.post('/', validateNewSaleFields, salesController.createSale);

module.exports = router;