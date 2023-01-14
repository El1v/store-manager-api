const schema = require('./validations/validationsInputValues');
const productModel = require('../models/product.model');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = schema.validateNewProduct(name);
  if (error.type) return error;

  const newProductId = await productModel.insert(name);
  const newProduct = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (productId, name) => {
  const errorId = schema.validateId(productId);
  if (errorId.type) return errorId;

  const product = await productModel.findById(productId);
  if (!product) { return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; }

  const errorName = schema.validateNewProduct(name);
  if (errorName.type) return errorName;

  const updatedProduct = await productModel.update(productId, name);

  return { type: null, message: updatedProduct };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
};