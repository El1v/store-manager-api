// const product = require('../../models/product.model');
const schemas = require('./schemas');

const validateId = (id) => {
  const { error } = schemas.idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateNewProduct = (nome) => {
  const { error } = schemas.addProductSchema.validate(nome);
  if (error) return { type: 'INVALID_VALUE', message: error.message }; 

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
};
