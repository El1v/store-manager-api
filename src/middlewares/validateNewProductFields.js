module.exports = (req, res, next) => {
  console.log('esse log aqi req', req.body);
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'fields not passed' });
  }

  return next();
};
