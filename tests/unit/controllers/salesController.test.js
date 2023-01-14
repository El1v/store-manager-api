const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const salesController = require("../../../src/controllers/sales.controller");
const salesService = require("../../../src/services/sale.service"); 

const { correctReturnedValue } = require('./mocks/sales.controller.mock');

describe('Teste de unidade da controller de produtos', function () {
  describe('cadastrando uma nova venda', function () {
    it("ao enviar dados invalidos, sem o productId no body", async function () {
      const res = {};
      const req = {
        body: [
          {
            quantity: 0,
          }
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(); 

      sinon
        .stub(salesService, "createSale")
        .resolves({
        type: "INVALID_VALUE",
        message: '"productId" is required',
      });
      
      await salesController.createSale(req, res);
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"productId" is required',
      });
    });
    it("ao enviar dados validos", async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: 1
          }
        ]
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, "createSale").resolves({
        type: null,
        message: { correctReturnedValue },
      });

      await salesController.createSale(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        correctReturnedValue,
      });
    })
  });
  afterEach(function () {
    sinon.restore();
  });
});