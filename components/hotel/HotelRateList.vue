<template>
  <div class="hotel-rate-list">
    <ul>
      <li v-for="rateInfo of rateInfoList" :key="rateInfo ? rateInfo.hotel_id : null" class="card-li">
        <rate-card :rate-info="rateInfo" />
      </li>
    </ul>
    
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import RateCard from  './RateCard.vue'

@Component({
  components: {
    RateCard
  }
})
export default class HotelRateList extends Vue {
  get rateInfoList() {
    if (this.rateInfos && this.rateInfos.length % 3 === 2) {
      this.rateInfos.push(undefined)
    }

    return this.rateInfos
  }
  rateInfos: any[] = [
    {
      hotel_id: 1,
      name: '富士',
      nameEn: 'fuji',
      copy: '',
      price: 'Y67,000~',
      unit: 'JPY',
      picture:'/image/card-3-fuji.jpg'
    },
    {
      hotel_id: 2,
      name: '富士',
      nameEn: 'fuji',
      copy: '',
      price: 'Y67,000~',
      unit: 'JPY',
      picture:'/image/card-3-fuji.jpg'
    },
    {
      hotel_id: 3,
      name: '富士',
      nameEn: 'fuji',
      copy: '',
      price: 'Y67,000~',
      unit: 'JPY',
      picture:'/image/card-3-fuji.jpg'
    },
    {
      hotel_id: 1,
      name: '富士',
      nameEn: 'fuji',
      copy: '',
      price: 'Y67,000~',
      unit: 'JPY',
      picture:'/image/card-3-fuji.jpg'
    },{
      hotel_id: 1,
      name: '富士',
      nameEn: 'fuji',
      copy: '',
      price: 'Y67,000~',
      unit: 'JPY',
      picture:'/image/card-3-fuji.jpg'
    },{
      hotel_id: 1,
      name: '富士',
      nameEn: 'fuji',
      copy: '',
      price: 'Y67,000~',
      unit: 'JPY',
      picture:'/image/card-3-fuji.jpg'
    },{
      hotel_id: 1,
      name: '富士',
      nameEn: 'fuji',
      copy: '',
      price: 'Y67,000~',
      unit: 'JPY',
      picture:'/image/card-3-fuji.jpg'
    },{
      hotel_id: 1,
      name: '富士',
      nameEn: 'fuji',
      copy: '',
      price: 'Y67,000~',
      unit: 'JPY',
      picture:'/image/card-3-fuji.jpg'
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

@media screen and (max-width: 950px) {
  .hotel-rate-list > ul {
    display: block;
  }

}

</style>