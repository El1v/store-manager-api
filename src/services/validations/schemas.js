const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductSchema = Joi.string().min(3).max(50).required();

module.exports = {
  idSchema,
  addProductSchema,
};