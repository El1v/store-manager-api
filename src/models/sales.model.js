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

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT id as sale_id, date, product_id, quantity FROM StoreManager.sales as sales
    RIGHT JOIN StoreManager.sales_products
    as salesProducts
    ON sales.id  = salesProducts.sale_id`,
  );

  return camelize(result);
};

const findById = async (id) => {
  const [result] = await connection.execute(
    `SELECT date, product_id, quantity FROM StoreManager.sales as sales
    RIGHT JOIN StoreManager.sales_products
    as salesProducts
    ON sales.id  = salesProducts.sale_id
    WHERE id = ? `, [id],
  );

  return camelize(result);
};

const remove = async (saleId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ? ',
    [saleId],
  );
  if (affectedRows > 0) {
    return '';
  }
};

module.exports = {
  insert,
  findAll,
  findById,
  remove,
};
