const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const insert = async (sales) => {
  const date = new Date();
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales ( date ) VALUE ( ? )',
    [date],
  );

  sales.forEach(async ({ productId, quantity }) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ? )',
      [insertId, productId, quantity],
);
  });

  const saleObj = {
    id: insertId,
    itemsSold: sales,
  };

  return camelize(saleObj);
};

module.exports = {
  insert,
};
