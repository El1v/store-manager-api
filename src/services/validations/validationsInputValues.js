// const product = require('../../models/product.model');
const schemas = require('./schemas');

const validateId = (id) => {
  const { error } = schemas.idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateNewProduct = (nome) => {
  const { error } = schemas.addProductSchema.validate(nome);
  console.log('error', error);
  if (error) {
    return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };
  } 

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
};
