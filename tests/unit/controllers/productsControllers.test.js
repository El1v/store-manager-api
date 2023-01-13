const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const productController = require('../../../src/controllers/product.controller');
const productService = require('../../../src/services/product.service');
const { productListMock, newProductMock } = require('./mocks/product.controller.mock');

describe('Teste de unidade da controller de produtos', function () {
  describe('Listando os produtos', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      //arrange
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'findAll').resolves({ type: null, message: productListMock })
      //act
      await productController.listProducts(req, res);
      //assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productListMock);
    });
  });
  describe('buscando um produto', function () {
    it('Deve retornar o status 200 e os dados do banco quando existir', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findById').resolves({ type: null, message: newProductMock });

      await productController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });
    it("Deve retornar um erro ao passar um ID invalido", async function () { 
      const res = {};
      const req = {
        params: { id: 'a' },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "findById")
        .resolves({ type: "INVALID_VALUE", message: '"id" must be a number' });
      
      await productController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"id" must be a number',
      });
    });
    it("Deve retornar um erro ao passar um ID que não exista no banco", async function () {
      const res = {};
      const req = {
        params: { id: "500" },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "findById")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: 'Product not found' });
      
      await productController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});