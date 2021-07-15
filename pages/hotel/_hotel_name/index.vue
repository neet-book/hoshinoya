<template>
  <div class="hotel">
    <hotel-menu :hotel="hotelInfo"  page='index' /> 
    <div class="hotel-page-container">
      <main>
        <div class="first-content" style="height: 400px;">
          <button @click="vi = !vi" style="padding-left: 20px;">change</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import HotelMenu from '~/components/hotel/HotelMenu/HotelMenu.vue'
import { getHotelRateInfo } from '~/utils/network'

@Component({
  components: {
    HotelMenu
  },
   async fetch({ store, params}) {
    const data = await getHotelRateInfo()
    store.commit('updateRateInfo', data)
  },
  mounted() {
    const that: any = this
    setTimeout(() => {
      that.vi = true
    }, 200);
    this.$store.commit('updateName', 'okinawa')
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


.hotel-page-container {
  height: 100vh;
  width: 100vw;
  overflow: scroll;
}


.first-content {
  height: 200px;
}

</style>
