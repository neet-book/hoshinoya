import axios from "axios"
import { toLowerCamelCase } from "./tools";

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

export interface Customer {
  adult: number
  infant: number
  baby: number
  child: number
}

export interface HotelBookingSearchCondition {
  date: string
  adult: number
  child: number
  infant: number
  baby: number
  stayNight: number,
  hotel: string
}

export async function getCalenderVacancies(hotelId: string | number, searchDate: string, condition: HotelBookingSearchCondition) {
  const { data: { code, data, msg } } = await common.get('/booking/vacancies', {
    params: {
      hotelId,
      searchDateStart: searchDate,
      stayNight: condition.stayNight,
      adult: condition.adult,
      child: condition.child,
      infant: condition.infant,
      baby: condition.baby
    }
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
  discount: {
    night: number
    off: string
    minOff: number
    maxOff: number
  }
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
  const { data: { code, data, msg}} = await hotelInstance.get('/details', {
    params: { hotelName: hotel }
  })

  if (code === 1) {
    const detail = {}
    for (let key in data) {
      // @ts-ignore
      detail[toLowerCamelCase(key)] = data[key]
    }
    return detail as HotelDetail
  } else {
    throw new Error('getHotelDetails Error:' + msg )
  }
}