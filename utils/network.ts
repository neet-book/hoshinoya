import axios from "axios"
import { HotelIntroduction } from './network.d'

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

export async function getHotelIntroduction(hotel: string): Promise<HotelIntroduction | null> {
    const { data: { code, data } } = await hotelInstance.get(`/introduction/${hotel}`)
    if (code === 1) {
        return data as HotelIntroduction
    } else {
        return null
    }
}