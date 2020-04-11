const HotelPrices = require('./hotel_prices')
const moment = require('moment')

let instance

/**
 * Singleton Price List
 */
class PriceList {
    constructor (hotels, programs) {
        if (instance) {
            return instance
        }
        instance = internals.build(hotels, programs)
    }

    getCheapestReservation (programType, ...days) {
        const { weekDays, weekendsDays } = internals.calculateWeekDaysAndWeekends(days)
    
        let cheapestReservation = { price: Number.MAX_VALUE, hotelName: null, classification: 0 }
    
        for (const key in instance) {
            const hotelPrices = instance[key]
            const hotelTotalPrice = internals.totalPriceByHotelPrices(hotelPrices, programType, weekDays, weekendsDays)
            if (hotelTotalPrice < cheapestReservation.price || (hotelTotalPrice === cheapestReservation.price && hotelPrices.hotel.classification > cheapestReservation.classification)) cheapestReservation = { price: hotelTotalPrice, hotelName: hotelPrices.hotel.name, classification: hotelPrices.hotel.classification }
        }
    
        return cheapestReservation
    }
}

const internals = {
    build (hotels, programs) {
        const priceList = {}

        for (const index in hotels) {
            const hotel = hotels[index]
            const prices = programs[index]
            priceList[hotel.name] = new HotelPrices(hotel, prices)
        }
        return priceList
    },
    calculateWeekDaysAndWeekends (days) {
        let weekDays = 0
        let weekendsDays = 0
        
        for (const day of days) {
            const dayOfWeek = moment(day).day()
            if (this.isWeekend(dayOfWeek)) weekendsDays++
            else weekDays++
        }
        
        return { weekDays, weekendsDays }
    },
    
    isWeekend (dayOfWeek) {
        return dayOfWeek === 0 || dayOfWeek === 6
    },

    totalPriceByHotelPrices(hotelPrices, programType, weekDays, weekendsDays) {
        return hotelPrices.programs[programType].weekDayPrice * weekDays + hotelPrices.programs[programType].weekendPrice * weekendsDays
    }
}

module.exports = PriceList
