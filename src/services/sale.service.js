const schema = require('./validations/validationsInputValues');
const salesModel = require('../models/sales.model');
const productModel = require('../models/product.model');

const validateIfExists = async (listSales) => {
  const resultProductByIdPromises = listSales.map(async (item) => {
    const product = await productModel.findById(item.productId);

    return product;
  });

  const resultProductById = await Promise.all(resultProductByIdPromises);
  return resultProductById;
};

const createSale = async (sales) => {
  const resultProductById = await validateIfExists(sales);

  const productNotFound = resultProductById.some((product) => !product);
  if (productNotFound) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const error = schema.validateNewSale(sales);
  if (error.type) return error;

  const newSale = await salesModel.insert(sales);
  return { type: null, message: newSale };
};

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const sale = await salesModel.findById(id);
  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

const removeSale = async (saleId) => {
  const errorId = schema.validateId(saleId);
  if (errorId.type) return errorId;

  const sale = await salesModel.findById(saleId);
  if (sale.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  await salesModel.remove(saleId);
  return { type: null, message: '' };
};

const updateSale = async (saleId, sales) => {
  const oldSales = await salesModel.findById(saleId);
  if (oldSales.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  const resultProductById = await validateIfExists(sales);
  const productNotFound = resultProductById.some((product) => !product);
  if (productNotFound) { return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; }

  const error = schema.validateNewSale(sales);
  if (error.type) return error;

  const updatedSales = await salesModel.update(saleId, sales);
  return { type: null, message: updatedSales };
};

module.exports = {
  createSale,
  findAll,
  findById,
  removeSale,
  updateSale,
};