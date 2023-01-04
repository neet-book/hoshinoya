const mongoose = require('mongoose')
const Schema = mongoose.Schema


const RateInfoSchema = new Schema ({
        hotelID: Number,
        hotelName: String,
        hotelNameEn: String,
        image: String,
        imageSource: String,
        price: String,
        unit: String,
        copy: String
    })

collection = 'hotel_rate_info'
RateInfoSchema.set('collection', collection)
module.exports = mongoose.model(collection, RateInfoSchema)
