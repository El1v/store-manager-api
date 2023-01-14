const salesService = require('../services/sale.service');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const sale = req.body;

  const { type, message } = await salesService.createSale(sale);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  createSale,
};