export interface HotelRateInfo {
    hotelId: number | string
    hotelName: string
    hotelNameEn: string
    price: number | string
    unit?: string
    copy?: string | undefined
}
  
export interface HotelHeader {
    hotelId: number | string
    hotelName: string
    hotelNameEn: string
    title: string
    discription: string
}

