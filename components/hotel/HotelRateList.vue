<template>
  <div class="hotel-rate-list">
    <ul>
      <li v-for="rateInfo of rateInfoList" :key="rateInfo ? rateInfo.hotel_id : null" class="card-li">
        <rate-card v-if="rateInfo !== null" :rate-info="rateInfo"  :disabled="rateInfo.nameEn === currentHotel" />
        <div v-else class="rate-info-placeholder"></div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">

import { Component, Vue, Prop } from 'nuxt-property-decorator'
import RateCard from  './RateCard.vue'
import { HotelRateInfo } from '~/components/hotel/hotel'

@Component({
  components: {
    RateCard
  }
})

export default class HotelRateList extends Vue {
  @Prop(String) currentHotel: string | undefined
  get rateInfoList() {
    let n: number = this.rateInfos ? this.rateInfos.length % 3 : 0
    if (n > 0) {
      // 填充列表直至能被3整除
      n = 3 - n
      const rateInfos: any = this.rateInfos
      for (let i = 0; i < n; i++) {
        rateInfos.push(null)
      }
    }
    return this.rateInfos
  }
  rateInfos: HotelRateInfo[]= [
    // {
    //   hotel_id: 1,
    //   name: '富士',
    //   nameEn: 'fuji',
    //   copy: '',
    //   price: 'Y67,000~',
    //   unit: 'JPY',
    //   picture:'/image/card-3-fuji.jpg'
    // },
    // {
    //   hotel_id: 2,
    //   name: '富士',
    //   nameEn: 'fuji',
    //   copy: '',
    //   price: 'Y67,000~',
    //   unit: 'JPY',
    //   picture:'/image/card-3-fuji.jpg'
    // },
    // {
    //   hotel_id: 3,
    //   name: '富士',
    //   nameEn: 'fuji',
    //   copy: '',
    //   price: 'Y67,000~',
    //   unit: 'JPY',
    //   picture:'/image/card-3-fuji.jpg'
    // },
    // {
    //   hotel_id: 1,
    //   name: '富士',
    //   nameEn: 'fuji',
    //   copy: '',
    //   price: 'Y67,000~',
    //   unit: 'JPY',
    //   picture:'/image/card-3-fuji.jpg'
    // },{
    //   hotel_id: 1,
    //   name: '富士',
    //   nameEn: 'fuji',
    //   copy: '',
    //   price: 'Y67,000~',
    //   unit: 'JPY',
    //   picture:'/image/card-3-fuji.jpg'
    // },{
    //   hotel_id: 1,
    //   name: '富士',
    //   nameEn: 'fuji',
    //   copy: '',
    //   price: 'Y67,000~',
    //   unit: 'JPY',
    //   picture:'/image/card-3-fuji.jpg'
    // },
    {
      hotelId: 1,
      hotelName: '富士',
      hotelNameEn: 'fuji',
      copy: '',
      price: 'Y67,000~',
      unit: 'JPY',
    },
    {
      hotelId: 1,
      hotelName: '富士',
      hotelNameEn: 'fuji',
      copy: '',
      price: 'Y67,000~',
      unit: 'JPY',
    }
  ]

//   get rateList() {
//     const rateList: any[] = []
//     const RateInfoList = this.rateInfoList
//     for (let index = 0; index < this.rateInfoList.length;) {
//       rateList.push(RateInfoList.slice(index, index + 3))
//       index += 3
//     }
//     const lastItem = rateList[rateList.length - 1]
//     if (lastItem.length <3) {
//       const start = lastItem.length
//       lastItem.fill(undefined, start)
//     }
//     return rateList
//   }
}
</script>


<style scoped>
.hotel-rate-list > ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.rate-info-placeholder {
  width: 250px;
  height: 80px;
  padding: 25px 0;
}

@media screen and (max-width: 950px) {
  .hotel-rate-list > ul {
    display: block;
  }

  .rate-info-placeholder {
    width: 0;
    height: 0;
    padding-left: 0;
  }

}
</style>