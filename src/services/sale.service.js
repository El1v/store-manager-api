const schema = require('./validations/validationsInputValues');
const salesModel = require('../models/sales.model');
const productModel = require('../models/product.model');

const createSale = async (sales) => {
  const resultProductByIdPromises = sales.map(async (item) => {
    const product = await productModel.findById(item.productId);

    return product;
  });

  const resultProductById = await Promise.all(resultProductByIdPromises);
  const productNotFound = resultProductById.some((product) => !product);
  if (productNotFound) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const error = schema.validateNewSale(sales);
  if (error.type) return error;

  const newSale = await salesModel.insert(sales);
  return { type: null, message: newSale };
};

module.exports = {
  createSale,
};