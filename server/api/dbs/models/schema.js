const { Schema } = require('mongoosee')

const RateInfoSchema = new Schema ({
    hotelId: Number,
    hotelName: String,
    hotelNameEn: String,
    price: String,
    unit: String,
    copy: String
})

