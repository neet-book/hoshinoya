<template>
  <div class="hotel-menu-area">
    <div class="title">
      虹夕诺雅 {{ hotel_name }}
    </div>
    <div class="link-list">
      <ul>
        <li></li>
      </ul>
    </div>
    <div class="room-booking"></div>
    <div class="hotel-hotline"></div>
    <div class="base-rate-list"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
interface HotelRate {
  hotel_id: number
  name: string
  name_en: string
  copy: string
  price: number | string
  unit?: string
  type?: string
}


@Component({
  async asyncData(): Promise<HotelRate[]> {
    return [
      {
        'name': '轻井泽',
        'copy': '远离烦嚣 拥抱大自然\r\n享受天然温泉的高级度假酒店', 
        'price': 'Y84,000', 
        'hotel_id': 1, 
        'name_en': 'karuizawa'
      },
      {
        'name': '京都', 
        'copy': '风景如画\n恍如走进京都千年古城\r\n尽显皇族风范的高级旅馆', 
        'price': 'Y109,000', 
        'hotel_id': 7, 
        'name_en': 'kyoto'
      },
      {
        'name': '富士',
        'copy': '于丘陵高地\r\n体验时尚豪华露营的梦幻乐趣', 
        'price': 'Y67,000', 
        'hotel_id': 14, 
        'name_en': 'fuji'
      },
      {
        'name': '竹富岛', 
        'copy': '感受美丽珊瑚岛\r\n体验琉球自然文化遗産的高级度假酒店', 
        'price': 'Y75,000', 
        'hotel_id': 10, 
        'name_en': 'taketomijima'
      },
      {
        'name': '冲绳', 
        'copy': '都留在“御城墙”的住宅', 
        'price': 'Y109,000', 
        'hotel_id': 18, 
        'name_en': 'okinawa'
      },
      {
        'name': '东京', 
        'copy': '于日本首都东京\r\n向世界展现日本的好客之道', 
        'price': 'Y84,000', 
        'hotel_id': 15, 
        'name_en': 'tokyo'
      },
      {
        'name': '巴厘岛', 
        'copy': '圣河旁的村落\r\n古老的精神在此栖息', 
        'price': 'Rp8,100,000', 
        'hotel_id': 502, 
        'name_en': 'bali'
      },
      {
        'name': '谷关', 
        'copy': '在温泉溪谷的楼阁中\r\n享受最舒适的熟睡', 
        'price': 'NT$18,000', 
        'hotel_id': 503, 
        'name_en': 'guguan'
      }
    ]
  },
})
export default class HotelMenuArea extends Vue {
  @Prop(String) hotel: string | undefined
  @Prop(Boolean) visible: string | undefined
}
</script>


<style scoped>

</style>