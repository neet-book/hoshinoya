<template>
  <div class="hotel-rate-list">
    <ul>
      <li v-for="rateInfo of rateInfoList" :key="rateInfo ? rateInfo.hotelID : null" class="card-li">
        <rate-card v-if="rateInfo !== null" :rate-info="rateInfo"  :disabled="rateInfo.hotelNameEn === currentHotel" />
        <div v-else class="rate-info-placeholder"></div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import RateCard from  './RateCard.vue'
import { RateInfo } from './RateCard.vue'

@Component({
  components: {
    RateCard
  }
})

export default class HotelRateList extends Vue {
  @Prop(Array) rateInfos: RateInfo[] | undefined
  currentHotel: string = this.$store.state.hotelNameEn
  get rateInfoList() {
    let n: number = this.rateInfos ? this.rateInfos.length % 3 : 0
    const rateInfos: any = this.rateInfos?.concat([])
    if (n > 0) {
      // 填充列表直至能被3整除
      n = 3 - n
      for (let i = 0; i < n; i++) {
        rateInfos.push(null)
      }
    }
    return rateInfos
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