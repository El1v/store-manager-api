const { expect } = require("chai");
const sinon = require("sinon");

const productService = require('../../../src/services/product.service');

const productModel = require('../../../src/models/product.model');

const { allProducts, invalidValue } = require('./mocks/product.service.mock');

describe('Teste de unidade da service de produtos', function () {
  describe('listagem de produtos', function () {
    it('retorna a lista completa de produtos', async function () { 
      //arrange 
      sinon.stub(productModel, 'findAll').resolves(allProducts);
      //act
      const result = await productService.findAll();
      //assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(allProducts);
    })
  });

  describe('busca de um produto', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      const result = await productService.findById(invalidValue);
      
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');

    })
    it("retorna um erro caso o produto não exista", async function () { 
      sinon.stub(productModel, 'findById').resolves(undefined);

      const result = await productService.findById(1);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    it("retorna o produto caso ID exista", async function () {
      sinon.stub(productModel, 'findById').resolves(allProducts[0])

      const result = await productService.findById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0])
    });
  })
   afterEach(function () {
     sinon.restore();
   });
})