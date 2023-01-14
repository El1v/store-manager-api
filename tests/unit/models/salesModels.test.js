const { expect } = require("chai");
const sinon = require("sinon");

const salesModel = require('../../../src/models/sales.model');
const connection = require("../../../src/models/connection");
const { newSale, returnedSale } = require("./mocks/sales.model.mock");

describe('Teste de unidade do model de sales', function () {
  it('Cadastrando uma venda', async function () {
    const date = new Date();

    sinon
      .stub(connection, "execute")
      .onFirstCall()
      .resolves([{ insertId: 3 }])
      .onSecondCall()
      .resolves([]);
    

    const result = await salesModel.insert(newSale);

    expect(result).to.be.deep.equal(returnedSale);

  })

  afterEach(function () {
    sinon.restore();
  });
});