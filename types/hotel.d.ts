declare namespace Hotel {
  interface HotelRateInfo {
    hotelId: number | string
    hotelName: string
    hotelNameEn: string
    price: number | string
    unit?: string
    copy?: string | undefined
  }


  interface ImageUrl {
    big?: string
    normal?: string
    square?: string
  }

  interface TopSection {
    title: string,
    content: string,
    backgroundImage: ImageUrl
  }

  interface LargeSection {
    title: string
    content: string
    circleImage: ImageUrl
    mapImage : ImageUrl
  }

  interface OutlineFirstSection {
    title: string
    carrouselImtes: [
      {
        title: string,
        image: ImageUrl
      }
    ]
    disc: string
  }

  interface OutlineSecondSection {
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
  }

  interface OutlineThirdSection {
    title: string
    carrouselItems: [
      {
        title: string,
        image: ImageUrl
      }
    ]
    disc: string,
    subDisc: {
      title: string,
      content: string
    }
  }
}
