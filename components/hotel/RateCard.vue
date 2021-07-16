<template>
  <div class="hotel-rate">
    <a  @click="onClick">
      <div class="rate-left" :class="{ 'is-disabled': disabled }">
        <div class="hotel-name">
          <svg class="hotel-logo" :class="{ 'is-disabled': disabled }">
          <use v-bind="{ 'xlink:href': `#logo-hotel-${ rateInfo.hotelNameEn }-small` }"></use></svg>
          {{ rateInfo.hotelName }}
        </div>
        <div :class="{ 'is-disabled': disabled }">一晚一间<br>
          {{ rateInfo.unit }} {{ rateInfo.price }}~
        </div>
      </div>
      <div class="hotel-picure">
        <div class="img-body" :style="{ backgroundImage: `url(${rateInfo.picture})` }"></div>
      </div>
    </a>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { RateInfo } from './HotelRateList.vue'

@Component
export default class HotelRate extends Vue {
  @Prop() rateInfo: RateInfo | undefined
  @Prop({ type: Boolean, default: () => false }) disabled: boolean | undefined
  
  onClick(event: Event) {
    if (this.disabled) {
      event.preventDefault()
      return false
    }
    this.$router.push('/hotel/' + this.rateInfo?.hotelNameEn)
  }
}
</script>


<style scoped>
.hotel-rate {
  cursor: pointer;
}

.hotel-rate > a {
  display: flex;
  width: 250px;
  height: 80px;
  padding: 25px 0;
  border-bottom: solid 1px #6662;
  justify-content: space-between;

  text-decoration: none;
  color: black;
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

.is-disabled {
  color: rgb(191, 191, 191) !important;
  fill: rgb(191, 191, 191);
  stroke: rgb(191, 191, 191);
}

@media screen and (max-width: 950px) {
  .hotel-rate > a {
    width: 100%;
  }
}
</style>