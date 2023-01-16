const salesService = require('../services/sale.service');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const sale = req.body;

  const { type, message } = await salesService.createSale(sale);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const listSales = async (_req, res) => {
  const { type, message } = await salesService.findAll();

  if (type) return res.status(errorMap.mapError(type).json(message));

  res.status(200).json(message);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  
  res.status(200).json(message);
};

const removeSale = async (req, res) => {
 const { id } = req.params;
 const { type, message } = await salesService.removeSale(id);

 if (type) return res.status(errorMap.mapError(type)).json({ message });

 res.status(204).json('');
};

module.exports = {
  createSale,
  listSales,
  getSale,
  removeSale,
};