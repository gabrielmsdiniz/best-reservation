const { REGULAR, LOYALTY } = require('./utils/program_types')

const Hotel = require('./models/hotel')
const PriceList = require('./models/price_list')
const PriceProgram = require('./models/price_program')


// TODO: should accept args values
const init = () => {
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
    
    const priceList = new PriceList(hotels, programs)

    const cheapestReservation = priceList.getCheapestReservation()

    return cheapestReservation.hotelName
}

module.exports = init()