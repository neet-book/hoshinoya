import axios from "axios"

const common = axios.create({
    baseURL: 'http://localhost:3000'
})

export async function getHotelRateInfos() {
    const { data: { code, data } } = await common.get('/hotel_rate_info')
    if (code === 1) {
        return data
    } else {
        return []
    }
}