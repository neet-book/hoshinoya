<template>
  <div class="hotel-rate">
    <div class="rate-left">
        <div class="hotel-name">
          <svg class="hotel-logo"><use v-bind="{ 'xlink:href': `#logo-hotel-${ rateInfo.nameEn }-small-black` }"></use></svg>
          {{ rateInfo.name }}
        </div>
        <div>一晚一间<br>{{ rateInfo.price }}</div>
    </div>
    <div class="hotel-picure">
      <div class="img-body" :style="{ backgroundImage: `url(${rateInfo.picture})` }"></div>
    </div>
  </div>
</template>
<script lang="ts">
interface RateInfo {
  hotel_id: number
  name: string
  nameEn: string
  copy: string
  price: number | string
  unit?: string
  type?: string
}

import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component
export default class HotelRate extends Vue {
  @Prop({ type: Object, required: true }) rateInfo: RateInfo | undefined
}
</script>


<style scoped>
.hotel-rate {
  display: flex;
  width: 250px;
  height: 80px;
  padding: 25px 0;
  border-bottom: solid 1px #6662;
  justify-content: space-between;
}

.rate-left {
  width: 120px;
}

.hotel-name {
  display: flex;
  align-items: center;
  font-size: 18px;
  vertical-align: middle;
  line-height: 100%;
  padding-bottom: 18px;
}

.hotel-logo {
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  fill: #000;
  stroke: #000;
  margin-right: 10px;
}

.img-body {
  height: 80px;
  width: 120px;
  border-radius: 5px;
  background-position: center center;
  background-repeat: no-repeat;
}

.rate-left div:nth-child(2) {
  font-size: 13px;
  line-height: 21px;
  color: #666;
}
</style>