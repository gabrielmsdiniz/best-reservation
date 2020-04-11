'use strict'

const chai = require('chai')
const expect = chai.expect

const Hotel = require('../src/models/hotel')
const PriceProgram = require('../src/models/price_program')
const { REGULAR, LOYALTY } = require('../src/utils/program_types')
const PriceList = require('../src/models/price_list')

describe('Success Test', function () {
  let priceList

  before(() => {
    const hotels = [
      new Hotel('Parque das Flores', 3),
      new Hotel('Jardim Botanico', 4),
      new Hotel('Mar Atlântico', 5)
    ]
    
    const programs = [
        { [REGULAR]: new PriceProgram(REGULAR, 110, 90), [LOYALTY]: new PriceProgram(LOYALTY, 80, 80) },
        { [REGULAR]: new PriceProgram(REGULAR, 160, 60), [LOYALTY]: new PriceProgram(LOYALTY, 110, 50) },
        { [REGULAR]: new PriceProgram(REGULAR, 220, 150), [LOYALTY]: new PriceProgram(LOYALTY, 100, 40) }
    ]

    priceList = new PriceList(hotels, programs)
  })

  it('should return Parque das Flores', function () {
    const response = priceList.getCheapestReservation('Regular', '20200316', '20200317', '20200318')
    expect(response.hotelName).to.be.equal('Parque das Flores')
  })

  it('should return Jardim Botanico', function () {
    const response = priceList.getCheapestReservation('Regular', '20200320', '20200321', '20200322')
    expect(response.hotelName).to.be.equal('Jardim Botanico')
  })

  it('should return Mar Atlântico', function () {
    const response = priceList.getCheapestReservation('Fidelidade', '20200326', '20200327', '20200328')
    expect(response.hotelName).to.be.equal('Mar Atlântico')
  })
})