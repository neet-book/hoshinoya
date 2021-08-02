const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HotelIntroductionSchema = new Schema({
  hotelID: Number,
  hotelName: String,
  hotelNameEn: String,
  topSection: {
    title: String,
    content: String,
    backgroundImage: {
      normal: String,
      big: String,
      square: String
    }
  },
  largeSection: {
    title: String,
    content: String,
    circleImage: {
      normal: String,
      big: String,
      square: String
    },
    mapImage : {
      normal: String,
      big: String,
      square: String
    }
  },
  outlineFirstSection: {
    title: String,
    carrouselImtes: [
      {
        title: String,
        image: {
          normal: String,
          big: String
        }  
      }
    ],
    disc: String
  },
  outlineSecondSection: {
    title: String,
    grids: [
      {
        image: {
          normal: String,
          big: String
        }
      }
    ],
    disc: String,
    subDisc: {
      title: String,
      content: String
    }
  },
  outlineThirdSection: {
    title: String,
    carrouselItems: [
      {
        title: String,
        image: {
          normal: String,
          big: String
        }  
      }
    ],
    disc: String,
    subDisc: {
      title: String,
      content: String
    }
  }

})

const collection = 'hotel_introduction'

HotelIntroductionSchema.set('collection', collection)

module.exports = mongoose.model(collection, HotelIntroductionSchema)