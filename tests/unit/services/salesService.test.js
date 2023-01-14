const { expect } = require("chai");
const sinon = require("sinon");

const salesService = require("../../../src/services/sale.service");

const salesModel = require("../../../src/models/sales.model");

const { invalidNewSale, validNewSale, returnedSale } = require("./mocks/sales.service.mock");

describe('Teste de unidade da service de produtos', function () {

  describe("cadastro de uma venda com valor invalido", function () {
    it("retorna um erro ao passar uma quantidade invalida", async function () {
      const result = await salesService.createSale(invalidNewSale);

      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal(
        '"quantity" must be greater than or equal to 1'
      );
    });
  });

  describe("cadastro de um produto com valor valido", function () {
    it("retorna objeto da venda com id e quantidade", async function () {
      sinon.stub(salesModel, "insert").resolves(returnedSale);
      // sinon.stub(productModel, "findById").resolves(allProducts[0]);

      const result = await salesService.createSale(validNewSale);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(returnedSale);
    });
  });
});