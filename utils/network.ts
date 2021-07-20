import axios from "axios"

const common = axios.create({
    baseURL: 'http://localhost:3000'
})

export async function getHotelRateInfos() {
    const { data: { code, data } } = await common.get('/hotel/hotel_rate_info')
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