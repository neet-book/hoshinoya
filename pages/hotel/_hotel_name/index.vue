<template>
  <div class="hotel">
    <hotel-menu :hotel="hotelInfo"  page='index' :rate-list="pageData.hotelRateList" />
    <div class="hotel-page-container">
      <header>
        <div class="hotel-header-container">
          <div class="hotel-header-fonts">
            <div class="hotel-header-logos">
              <svg viewBox="0 0 114 114">
                <use v-bind="{ 'xlink:href': '#' + hotelInfo.logo }"></use>
              </svg>
              <svg viewBox="0 0 114 114">
                <use xlink:href="#logo-hoshinoya-text"></use>
              </svg>
              <svg viewBox="0 0 114 114">
                <use xlink:href="#logo-hoshinoya-mark"></use>
              </svg>
            </div>
            <div class="hotel-header-title">
              虹夕诺雅<br />
              <span>{{ pageData.name }}</span>
            </div>
            <div class="hotel-header-disc"></div>
          </div>
          <div class="hotel-header-bg" :style="`background-image: url(/image/${pageData.nameEn}/hotel_page_top_background.jpg)`"></div>
        </div>
      </header>
      <main>
        <div class="first-content" style="height: 100px;"></div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import HotelMenu from '~/components/hotel/HotelMenu/HotelMenu.vue'


@Component({
  components: {
    HotelMenu
  }
})
export default class Hotel extends Vue {

  get hotelInfo() {
    return {
      name: this.pageData.name,
      nameEn: this.pageData.nameEn,
      logo: this.pageData.logo
    }
  }

  pageData = {
    name: '冲绳',
    nameEn: 'okinawa',
    logo: 'logo-hotel-okinawa',
    pageHeadBG: '',
    hotelRateList: [
      {
        'name': '轻井泽',
        'copy': '远离烦嚣 拥抱大自然\r\n享受天然温泉的高级度假酒店', 
        'price': 'Y84,000', 
        'hotel_id': 1, 
        'nameEn': 'karuizawa'
      },
      {
        'name': '京都', 
        'copy': '风景如画\n恍如走进京都千年古城\r\n尽显皇族风范的高级旅馆', 
        'price': 'Y109,000', 
        'hotel_id': 7, 
        'nameEn': 'kyoto'
      },
      {
        'name': '富士',
        'copy': '于丘陵高地\r\n体验时尚豪华露营的梦幻乐趣', 
        'price': 'Y67,000', 
        'hotel_id': 14, 
        'nameEn': 'fuji'
      },
      {
        'name': '竹富岛', 
        'copy': '感受美丽珊瑚岛\r\n体验琉球自然文化遗産的高级度假酒店', 
        'price': 'Y75,000', 
        'hotel_id': 10, 
        'nameEn': 'taketomijima'
      },
      {
        'name': '冲绳', 
        'copy': '都留在“御城墙”的住宅', 
        'price': 'Y109,000', 
        'hotel_id': 18, 
        'nameEn': 'okinawa'
      },
      {
        'name': '东京', 
        'copy': '于日本首都东京\r\n向世界展现日本的好客之道', 
        'price': 'Y84,000', 
        'hotel_id': 15, 
        'nameEn': 'tokyo'
      },
      {
        'name': '巴厘岛', 
        'copy': '圣河旁的村落\r\n古老的精神在此栖息', 
        'price': 'Rp8,100,000', 
        'hotel_id': 502, 
        'nameEn': 'bali'
      },
      {
        'name': '谷关', 
        'copy': '在温泉溪谷的楼阁中\r\n享受最舒适的熟睡', 
        'price': 'NT$18,000', 
        'hotel_id': 503, 
        'nameEn': 'guguan'
      }
    ]
  }
  
}
</script>

<style scoped>
.hotel {
  font-family: hsn-zhcn-serif-semibold, hsn-zhtw-serif-semibold, serif;
}


.hotel-header-container {
  height: 1000px;
  position: relative;
  color: white;
  border-bottom: 1px solid;
  overflow: hidden;
}

.hotel-header-fonts {
  margin-top: 132px;
  text-align: center;
}

.hotel-header-logos {
  width: 48px;
  margin: 0 auto;
}

.hotel-header-logos > svg {
  fill: white;
  margin-top: 4px;
}

.hotel-header-title {
  font-size: 21px;
  line-height: 21px;
  letter-spacing: 1.2px;
  font-weight: 400;
}

.hotel-header-bg {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
