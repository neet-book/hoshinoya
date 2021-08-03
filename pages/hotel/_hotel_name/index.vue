<template>
  <div class="hotel">
    <hotel-menu :hotel="hotelInfo"  page='index' /> 
    <div class="hotel-page-container">
      <hotel-header :content="topSection"></hotel-header>
      <main>
        <div class="first-content" style="height: 100px;">
          <button @click="vi = !vi" style="padding-left: 20px;">change</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import HotelMenu from '~/components/hotel/HotelMenu/HotelMenu.vue'
import HotelHeader from '~/components/hotel/Head/HotelHeader.vue'
import { getHotelRateInfos, getHotelIntroduction } from '~/utils/network'

@Component({
  components: {
    HotelMenu,
    HotelHeader
  },
  async fetch({ store }) {
    const data = await getHotelRateInfos()
    store.commit('updateHotelRateInfo', data)
  },
  async asyncData(ctx) {
    const hotel = ctx.params.hotel_name
    const data = await getHotelIntroduction(hotel)
    return data || {}
  },
  mounted() {
    const that: any = this
    that.$store.commit('updateHotelName', that.hotelName)
    that.$store.commit('updateHotelNameEn', that.hotelNameEn)
  }
})

export default class Hotel extends Vue {
  hotelNameEn: string = ''
  hoelName: string = ''
  topSection: Hotel.TopSection | undefined 
  largeSection: Hotel.LargeSection | undefined
  outlineFirstSection: Hotel.OutlineFirstSection | undefined
  outlineSecondSection: Hotel.OutlineSecondSection | undefined
  outlineTridSection: Hotel.OutlineThirdSection | undefined  


  vi: boolean = false
  get hotelInfo() {
    return {
      name: this.hoelName,
      nameEn: this.hotelNameEn,
      logo: 'logo-hotel-' + this.hotelNameEn
    }
  }

  
  delayTime(rowIndex: number, charIndex: number, charCount: number, text: string, level=100): number {
    const rowCount = text.split('\n').length
    // 最后一行
    if (rowIndex + 1 === rowCount) {
      return level * (charCount - charIndex) + level
    }

    // 第一行
    if (rowIndex === 0) {
      if (charIndex === 0) return 0
      return 10 * charIndex + level
    }

    return level
  }

  
}
</script>

<style scoped>
.hotel {
  font-family: hsn-zhcn-serif-regulari, hsn-zhcn-serif-semibold, hsn-zhtw-serif-semibold, serif;
}
</style>
