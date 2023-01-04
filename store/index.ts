import { GetterTree, ActionTree, MutationTree } from 'vuex'
interface HotelState {
    hotelName: string
    hotelNameEn: string
    distance: number 
    rateInfoList: Hotel.HotelRateInfo[]
}

export const state = (): HotelState => {
    return {
        hotelName: '',
        hotelNameEn: '',
        distance: 0,
        rateInfoList: [],
    }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    hotelName: state => state.hotelName
}

export const mutations: MutationTree<RootState> = {
    updateHotelName: (state, hotelName: string) => state.hotelName = hotelName,
    updateHotelNameEn: (state, hotelNameEn: string) => state.hotelNameEn = hotelNameEn,
    updateDistance: (state, distance: number) => state.distance = distance,
    updateHotelRateInfo: (state, rateInfo: Hotel.HotelRateInfo[]) => state.rateInfoList = rateInfo
}
