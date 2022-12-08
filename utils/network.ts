import axios from "axios"

const common = axios.create({ baseURL: 'http://localhost:3000' })
const hotelInstance = axios.create({ baseURL: 'http://localhost:3000/hotel'})

export async function getHotelRateInfos() {
  const { data: { code, data } } = await hotelInstance.get('/hotel_rate_info')
  if (code === 1) {
    return data
  } else {
    return []
  }
}

/**
 * 获取Hoshinoya主页数据
 */
export async function getHoshinoyaHome() {
  const url = '/hoshinoya_home'
  const { data: { code, msg, data } } = await common.get(url)
  if (code === 1) {
    return data
  } else {
    console.log(`[network] ${url} msg: ${msg} data: ${data}`)
    return {}
  }
}


/**
 * 获取酒店详细介绍数据
 * @param hotel 要获取数据的酒店名称
 */
export async function getHotelIntroduction(hotel: string): Promise<Hotel.HotelIntroduction | null> {
  const { data: { code, data } } = await hotelInstance.get(`/introduction/${hotel}`)
  if (code === 1) {
    // @ts-ignore
    return data as Hotel.HotelIntroduction
  } else {
    return null
  }
}

interface Customer {
  adult: number
  infant: number
  baby: number
  child: number
}

export async function getCalenderVacancies(hotel: string, date: string, stayNight: number, customers: Customer) {
  const { data: { code, data, msg } } = await hotelInstance.get('/booking/vacancies', {
    params: { date }
  })

  if (code === 1) {
    return data
  } else {
    throw new Error('getCalenderVacancies Error:' + msg )
  }
}

export interface HotelDetail {
  hotelId: string | number
  address: string
  hotelName: string
  hotelNameZh: string
  checkIn: string
  checkOut: string
  hotelEmail: string
  maxStayNight: number
  oneNight: boolean
  oneNightMessage: string
  maxRoomCount: string
  phoneNumber: string
  searchCondition: SearchCondition
  searchDescriptionTitle: string
  searchDescriptionContent: string
}

export interface SearchCondition {
  babyNumMax: number
  babyNumMin: number
  infantNumMax: number
  infantNumMin: number
  childNumMax: number
  childNumMin: number
  adultNumMax: number
  adultNumMin: number
  adultNumDefault: number
  babyNumDefault: number
  infantNumDefault: number
  childNumDefault: number
  hotelNightDefault: number
  hotelNightMax: number
}

export async function getHotelDetails(hotel: string): Promise<HotelDetail> {
  const { data: { code, data, msg}} = await hotelInstance.get('/hotel/details', {
    params: { hotelName: hotel }
  })

  if (code === 1) {
    return data
  } else {
    throw new Error('getCalenderVacancies Error:' + msg )
  }
}