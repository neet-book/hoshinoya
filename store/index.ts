import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { HotelRateInfo } from '~/components/hotel/hotel'

interface HotelState {
    hotelName: string
    hotelNameEn: string
    rateInfoList: HotelRateInfo[]
}

export const state = (): HotelState => {
    return {
        hotelName: '',
        hotelNameEn: '',
        rateInfoList: [],
    }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    hotelName: state => state.hotelName
}

export const mutations: MutationTree<RootState> = {
    updateName: (state, hotelName: string) => state.hotelName = hotelName,
    updateNameEn: (state, hotelNameEn: string) => state.hotelNameEn = hotelNameEn,
    updateRateInfo: (state, rateInfo: HotelRateInfo[]) => state.rateInfoList = rateInfo
}