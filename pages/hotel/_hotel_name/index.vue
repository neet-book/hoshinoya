<template>
  <div class="hotel">
    <hotel-menu :hotel="hotelInfo"  page='index' /> 
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
              <p>虹夕诺雅</p>
              <p>{{ pageData.name }}</p>
              <h2> 
                <template v-for="(row, row_index) of pageData.copy.split('\n')">
                  <span 
                    v-for="(char, char_index) of row"
                    :class="{'text-visible': vi}"
                    :style="`transition-delay: ${ delayTime(row_index, char_index, row.length, pageData.copy) }ms`" 
                    :key="`lien-${row_index}-${char_index}`"
                  >{{ char }}
                  </span>
                  <br :key="`-${row_index}`"> 
                </template>
              </h2>
            </div>
            <div class="hotel-header-disc" >
              <template v-for="(row, row_index) of pageData.discription.split('\n')">
                <template v-for="(char, char_index) of row">
                  <span
                    :class="{ 'text-visible': vi}"
                    :style="`transition-delay: ${delayTime(row_index, char_index, row.length, pageData.discription, 10)}ms`" 
                    :key="row_index + '-' + char_index"
                  >{{char}}</span>
                </template>
                <br :key="row_index">
              </template>
            </div>
          </div>
          <div class="hotel-header-bg" :style="`background-image: url(/image/${pageData.nameEn}/hotel_page_top_background.jpg)`"></div>
        </div>
      </header>
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
import { getHotelRateInfos } from '~/utils/network'

@Component({
  components: {
    HotelMenu
  },
  async fetch({ store }) {
    const data = await getHotelRateInfos()
    store.commit('updateHotelRateInfo', data)
  },
  mounted() {
    const that: any = this
    setTimeout(() => {
      that.vi = true
    }, 200);
  }
})
export default class Hotel extends Vue {
  vi: boolean = false
  get hotelInfo() {
    return {
      name: this.pageData.name,
      nameEn: this.pageData.nameEn,
      logo: this.pageData.logo
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

  pageData = {
    name: '冲绳',
    nameEn: 'okinawa',
    logo: 'logo-hotel-okinawa',
    copy: '在山谷的\n村落里聆听\n森林之声',
    discription: '轻井泽的森林是诉说者。\n在路的尽头，他们向旅人低声私语。\n在柔和的阳光中，随风飘动的叶子摩擦的声音。\n不知从哪里传来的鸟鸣。草丛中潜伏的虫声。\n没有停歇的，细微的河水声传到耳边。\n万籁俱寂的村落，随着太阳升起，\n被森林丰富的声音包着。',
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
  margin-top: 12px;
}
.hotel-header-title > p{
  padding: 0;
  margin: 0;
}
/* page name */
.hotel-header-title p:nth-child(1) {
  font-size: 21px;
  line-height: 21px;
  letter-spacing: 1.2px;
  font-weight: 400; 
  padding-top: 10px;
}
/* title */
.hotel-header-title > h2 {
  margin-top: 10px;
  font-family: inherit;
  font-size: 38px; 
  line-height: 32px;
  letter-spacing: 2px;
  text-shadow: rgba(4, 0, 0, 0.6) 0px 0px 80px;
}


.hotel-header-disc {
  font-size: 18px;
  letter-spacing: 1.8px;
  line-height: 32px;
  text-shadow: 0 0 80px rgb(4 0 0 / 60%);
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

.hotel-header-title > h2 > span,
.hotel-header-disc > span {
  transition: all 500ms cubic-bezier(.445,.05,.55,.95);
  /* transition: opacity 500ms cubic-bezier(.445,.05,.55,.95); */
  opacity: 0;
}


.text-visible {
  opacity: 1 !important;
}

</style>
