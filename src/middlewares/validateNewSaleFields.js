module.exports = (req, res, next) => {
  const sales = req.body;
  const hasNotProductId = sales.some((sale) => !sale.productId);
    if (hasNotProductId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
  
  const hasNotQuantity = sales.some((sale) => !sale.quantity && sale.quantity !== 0);
  if (hasNotQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  return next();
};
