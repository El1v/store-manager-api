// const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return product;
};

const insert = async (product) => {  
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products ( name ) VALUE ( ? )',
    [product],
  );

  return insertId;
};

const update = async (productId, name) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ? ',
    [name, productId],
  );
  if (affectedRows > 0) {
    const result = await findById(productId);  
    return result;
  }
};

const remove = async (productId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ? ',
    [productId],
  );
  if (affectedRows > 0) {
    return '';
  }
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
};
