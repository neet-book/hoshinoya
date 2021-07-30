export interface ImageUrl {
    big?: string,
    normal?: string,
    square?: string
}
export interface HotelIntroduction {
    hotelID: number,
    hotelName: string,
    hotelNameEn: string,
    topSection: {
      title: string,
      content: string,
      backgroundImage: ImageUrl
    },
    largeSection: {
      title: string,
      content: string,
      circleImage: ImageUrl
      mapImage : ImageUrl
    },
    outlineFirstSection: {
      title: string,
      carrouselImtes: [
        {
          title: string,
          image: ImageUrl
        }
      ],
      disc: string
    },
    outlineSecondSection: {
      title: string,
      grids: [
        {
          image: ImageUrl
        }
      ],
      disc: string,
      subDisc: {
        title: string,
        content: string
      }
    },
    outlineThirdSection: {
      title: string,
      carrouselItems: [
        {
          title: string,
          image: ImageUrl
        }
      ],
      disc: string,
      subDisc: {
        title: string,
        content: string
      }
    }
  
  }