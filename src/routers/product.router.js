const express = require('express');

const productController = require('../controllers/product.controller');

const validateNewProductFields = require('../middlewares/validateNewProductFields');

const router = express.Router();

router.get('/search', productController.findByName);

router.get('/', productController.listProducts);

router.get('/:id', productController.getProduct);

router.post(
  '/',
  validateNewProductFields,
  productController.createProduct,
);

router.put('/:id', validateNewProductFields, productController.updateProduct);

router.delete('/:id', productController.removeProduct);

module.exports = router;