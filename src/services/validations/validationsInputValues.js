// const product = require('../../models/product.model');
const schemas = require('./schemas');

const validateId = (id) => {
  const { error } = schemas.idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateNewProduct = (nome) => {
  const { error } = schemas.addProductSchema.validate(nome);
  if (error) {
    return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };
  } 

  return { type: null, message: '' };
};

const validateNewSale = (listSales) => {
  const error = listSales.map((sales) =>
    schemas.addSaleSchema.validate(sales.quantity));
  
  const hasError = error.some((er) => er.error);
  if (hasError) {
    return {
      type: 'INVALID_VALUE',
      message: '"quantity" must be greater than or equal to 1',
    };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
  validateNewSale,
};
