const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const insert = async (sales) => {
  sales.map((sale) => {

  });
  const columns = Object.keys(snakeize(sales)).join(', ');

  const placeholders = Object.keys(sales)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`,
    [...Object.values(sales)],
  );

  return insertId;
};

module.exports = {
  insert,
};
