<template>
  <div class="hotel" @scroll="onScroll">
    <hotel-menu :hotel="hotelInfo"  page='index' /> 
    <div class="hotel-page-container">
      <hotel-header :content="topSection"></hotel-header>
      <main>
        <large-section :content="largeSection"></large-section>
        <outline-first-section :content="outlineFirstSection" ></outline-first-section>
        <outline-second-section :content="outlineSecondSection"></outline-second-section>
        <outline-third-section :content="outlineThirdSection"></outline-third-section>
      </main>
      <footer>
        <hotel-footer></hotel-footer>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'
import HotelMenu from '/components/hotel/HotelMenu/HotelMenu.vue'
import HotelHeader from '/components/hotel/Head/HotelHeader.vue'
import LargeSection from '/components/hotel/LargeSection/LargeSection.vue'
import OutlineFirstSection from '/components/hotel/OutlineSections/OutlineFirstSection.vue'
import {getHotelIntroduction, getHotelRateInfos} from '~/utils/network'
import OutlineSecondSection from "/components/hotel/OutlineSections/OutlineSecondSection.vue";
import OutlineThirdSection from "/components/hotel/OutlineSections/OutlineThirdSections"
import HotelBottom from "/components/hotel/HotelBottom/HotelBottom.vue";

@Component({
  layout: 'hotel',
  components: {
    HotelMenu,
    HotelHeader,
    LargeSection,
    OutlineFirstSection,
    OutlineSecondSection,
    OutlineThirdSection,
    HotelFooter: HotelBottom,
  },
  async fetch({ store }) {
    const data = await getHotelRateInfos()
    store.commit('updateHotelRateInfo', data)
  },
  async asyncData(ctx) {
    const hotel = ctx.params.hotel_name
    return await getHotelIntroduction(hotel)
  },
  mounted() {
    const that: any = this
    that.$store.commit('updateHotelName', that.hotelName)
    that.$store.commit('updateHotelNameEn', that.hotelNameEn)

  }
})

export default class HotelPage extends Vue {
  hotelNameEn: string = ''
  hotelName: string = ''
  topSection: Hotel.TopSection | undefined 
  largeSection: Hotel.LargeSection | undefined
  outlineFirstSection: Hotel.OutlineFirstSection | undefined
  outlineSecondSection: Hotel.OutlineSecondSection | undefined
  outlineThirdSection: Hotel.OutlineThirdSection | undefined
  
  // 页面滚动距离
  distance: number = 0

  vi: boolean = false
  get hotelInfo() {
    return {
      name: this.hotelName,
      nameEn: this.hotelNameEn,
      logo: 'logo-hotel-' + this.hotelNameEn
    }
  }

  onScroll(event: Event) {
    const container: Element = event.target as Element
    // 优化scroll
    window.requestAnimationFrame(() => {
      this.$store.commit('updateDistance', container.scrollTop)
    })
  }
}
</script>

<style scoped>
.hotel {
  width: 100vw;
  height: 100vh;
  overflow: auto;
}

.first-content {
  height: 500px;
}
</style>
