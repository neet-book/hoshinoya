<template>
  <div class="hotel-rate-list">
    <ul>
      <li v-for="rateInfo of rateInfoList" :key="rateInfo ? rateInfo.hotelID : null" class="card-li">
        <rate-card v-if="rateInfo !== null" :rate-info="rateInfo"  :disabled="rateInfo.nameEn === currentHotel" />
        <div v-else class="rate-info-placeholder"></div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import RateCard from  './RateCard.vue'

export interface RateInfo {
  hotelId: number
  hotelName: string
  hotelNameEn: string
  copy: string
  price: number | string
  unit?: string
  type?: string
}

@Component({
  components: {
    RateCard
  }
})

export default class HotelRateList extends Vue {
  @Prop(String) currentHotel: string | undefined
  @Prop(Array) rateInfos: RateInfo[] | undefined
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