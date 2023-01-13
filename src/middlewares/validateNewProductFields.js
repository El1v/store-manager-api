module.exports = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(422).json({ message: '"name" is required' });
  }

  return next();
};
