const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HoshinoayHomeSchema = new Schema({
    swiperImages: [{
       hotelName: String,
       hotelNameEn: String,
       image: {
           normal: String,
           big: String,
           square: String
       }
   }],
   navCardImages: [
       {
            hotelName: String,
            hotelNameEn: String,
            discription: String,
            image: {
                normal: String,
                big: String,
                square: String
            }
       }
   ]
})

const collection = 'hoshinoya_home'
HoshinoayHomeSchema.set('collection', collection)

module.exports = mongoose.model(collection, HoshinoayHomeSchema)