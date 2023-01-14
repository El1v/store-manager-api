const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductSchema = Joi.string().min(5).required();

const addSaleSchema = Joi.number().integer().min(1).required();

module.exports = {
  idSchema,
  addProductSchema,
  addSaleSchema,
};