const productMock = {
  name: "Martelo de Thor",
};

const newProductMock = { id: 3, ...productMock };

const productListMock = [newProductMock];

module.exports = {
  productMock,
  newProductMock,
  productListMock,
}